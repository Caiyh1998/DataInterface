'use strict';

const Service = require('egg').Service;

class Game extends Service {
    async signUp(userid, gameid) {
        const conn = await this.app.mysql.beginTransaction();
        try {
            const user = await conn.get('user', {
                userid: userid
            })
            const game = await conn.get('game', {
                gameid: gameid
            })

            if (Number(game.PlayerCNT) >= Number(game.GameQuota)){
                return "报名已满"
            }

            if (Number(user.Integral) < Number(game.GamePrice)) {
                return "积分不足"
            }


            await conn.update('user', {
                integral: Number(user.Integral) - Number(game.GamePrice)
            }, {
                where: {
                    userid: userid
                }
            });

            const randomNum = Math.floor(Math.random() * (game.GameQuota-game.PlayerCNT))

            let playeries = JSON.parse(game.Player)
            let SeatNum = JSON.parse(game.SeatNum)

            const seatNum = SeatNum.splice(randomNum,1)[0];

            const player = {
                userid : userid,
                seatNum : seatNum
            }

            playeries.push(player)

            await conn.update('game', {
                PlayerCNT: Number(game.PlayerCNT) + 1,
                Player: JSON.stringify(playeries),
                SeatNum: JSON.stringify(SeatNum)
            }, {
                where: {
                    gameid: gameid
                }
            });
            await conn.insert('record', {
                type: '报名参赛',
                from: user.UserName,
                to: game.GameTitle,
                date: new Date(),
                Sum: game.GamePrice,
                balance: Number(user.Integral) - Number(game.GamePrice),
                status: '完成'
            })
            await conn.commit();  //提交事务
            return "操作成功"
        } catch (err) {
            await conn.rollback();//回滚事务
            throw err;
            return "操作失败"
        }
    }

    async create(title, quota, date, price = 100, seatNum) {
        const conn = await this.app.mysql.beginTransaction();
        try {
            await conn.insert('game', {
                GameTitle: title,
                GameQuota: quota,
                GameDate: date,
                Player: '[]',
                GamePrice: price,
                SeatNum: JSON.stringify(seatNum),
                CreateDate: new Date(),
            })
            await conn.commit();  //提交事务
            return "操作成功"
        } catch (err) {
            await conn.rollback();//回滚事务
            throw err;
            return "操作失败"
        }
    }

    async delete(gameid) {
        const conn = await this.app.mysql.beginTransaction();
        try {
            await conn.delete('game', {gameid:gameid})
            await conn.commit();  //提交事务
            return "操作成功"
        } catch (err) {
            await conn.rollback();//回滚事务
            throw err;
            return "操作失败"
        }
    }
}

module.exports = Game;