'use strict';

const Controller = require('egg').Controller;

class Game extends Controller {
    async signUp() {
        const ctx = this.ctx
        const query = ctx.query

        const userid = query.uid;
        const gameid = query.gameid

        const message = await ctx.service.game.signUp(userid, gameid)
        const user = await ctx.service.user.getByID(userid)
        ctx.body = {
            'Access-Control-Allow-Origin': '*',
            data: {
                userinfo: user
            },
            message: message,
            success: false
        };
        if (message === '操作成功') ctx.body.success = true
        else ctx.body.success = false
    }

    async get() {
        const ctx = this.ctx;
        try {
            const list = await this.app.mysql.select('game', {
                // columns: ['GameID', 'GameTitle', 'GameQuota', 'GameDate', 'Player'],
                // where: {GoodsType: type},
                orders: [['GameDate', 'desc']],
                limit: 100,
                offset: 0,
            })
            ctx.body = {
                'Access-Control-Allow-Origin': '*',
                data: {
                    game: {
                        list: list
                    }
                },
                success: true
            }
        } catch (e) {
            console.log(e);
            ctx.throw(500, 'service error');
        }
    }

    async create() {
        const ctx = this.ctx;
        const query = ctx.query

        const title = query.title
        const quota = query.quota
        const date = query.date
        const price = query.price
        let seatNum = []

        for(let i = 1;i<=quota;i++){
            seatNum.push(i)
        }

        const message = await ctx.service.game.create(title, quota, date, price, seatNum)
        ctx.body = {
            'Access-Control-Allow-Origin': '*',
            message: message,
            success: false
        };
        if (message === '操作成功') ctx.body.success = true
        else ctx.body.success = false
    }

    async delete() {
        const ctx = this.ctx;
        const query = ctx.query

        const gid = query.gameid

        const message = await ctx.service.game.delete(gid)
        ctx.body = {
            'Access-Control-Allow-Origin': '*',
            message: message,
            success: false
        };
        if (message === '操作成功') ctx.body.success = true
        else ctx.body.success = false
    }
}

module.exports = Game;