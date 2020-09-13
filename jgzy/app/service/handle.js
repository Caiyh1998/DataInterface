'use strict';

const Service = require('egg').Service;

class Handle extends Service {
    async sendIntegral(from, to, integral) {
        const conn = await this.app.mysql.beginTransaction();
        try {
            let userto = await conn.get('user', {
                phonecode: to
            })

            if (userto === null) {
                await conn.commit();  //提交事务
                return "用户不存在"
            }

            let userfrom = await conn.get('user', {
                userid: from
            })

            if (Number(userfrom.Integral) < Number(integral)) {
                await conn.commit();  //提交事务
                return "积分不足"
            }

            c
            await conn.query('update user set integral = (integral + ?) where phonecode = ?', [integral, to]);

            userto = await conn.get('user', {
                phonecode: to
            })
            userfrom = await conn.get('user', {
                userid: from
            })

            await conn.insert('record', {
                type: '积分转出',
                from: userfrom.UserName,
                to: userto.UserName,
                date: new Date(),
                Sum: integral,
                balance: userfrom.Integral,
                status: '完成'
            })
            await conn.insert('record', {
                type: '积分转入',
                from: userto.UserName,
                to: userfrom.UserName,
                date: new Date(),
                Sum: integral,
                balance: userto.Integral,
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

    async buyone(uid, gid, remarks) {
        const conn = await this.app.mysql.beginTransaction();
        try {
            const user = await conn.get('user', {
                userid: uid
            })
            const goods = await conn.get('goods', {
                goodsid: gid
            })
            if (Number(user.Integral) < Number(goods.GoodsPrice)) {
                await conn.commit();  //提交事务
                return "积分不足"
            }
            await conn.update('user', {
                integral: Number(user.Integral) - Number(goods.GoodsPrice)
            }, {
                where: {
                    userid: uid
                }
            });
            await conn.insert('record', {
                type: '积分兑换',
                from: user.UserName,
                to: goods.GoodsName,
                amount: 1,
                remarks: remarks,
                date: new Date(),
                Sum: goods.GoodsPrice,
                balance: Number(user.Integral) - Number(goods.GoodsPrice),
                status: '待办'
            })
            await conn.commit();  //提交事务
            return "操作成功"
        } catch (err) {
            await conn.rollback();//回滚事务
            throw err;
            return "操作失败"
        }
    }

    async update(uid, uname, phone) {
        const conn = await this.app.mysql.beginTransaction();
        try {
            await conn.update('user', {
                username: uname,
                phoneCode: phone
            }, {
                where: {
                    userid: uid
                }
            })
            await conn.commit();  //提交事务
            return "操作成功"
        } catch (err) {
            await conn.rollback();//回滚事务
            throw err;
            return "操作失败"
        }
    }

    async updatePassword(uid, oldP, newP) {
        const conn = await this.app.mysql.beginTransaction();
        try {

            await conn.update('user', {
                Password: newP,
            }, {
                where: {
                    userid: uid,
                    Password: oldP
                }
            })
            await conn.commit();  //提交事务
            return "操作成功"
        } catch (err) {
            await conn.rollback();//回滚事务
            throw err;
            return "操作失败"
        }
    }

    async updateIntegral(userid, variation, method, remarks) {
        const conn = await this.app.mysql.beginTransaction();
        try {
            const user = await conn.get('user', {
                userid: userid
            })
            if (method === 'add') {
                await conn.query('update user set integral = (integral + ?) where userid = ?', [variation, userid])
                await conn.insert('record', {
                    type: '积分转入',
                    from: user.UserName,
                    to: '长颈鹿Admin',
                    amount: 1,
                    remarks: remarks,
                    date: new Date(),
                    Sum: variation,
                    balance: Number(user.Integral) + Number(variation),
                    status: '完成'
                })
            } else if (method === 'sub') {
                await conn.query('update user set integral = (integral - ?) where userid = ?', [variation, userid])
                await conn.insert('record', {
                    type: '积分转出',
                    from: user.UserName,
                    to: '长颈鹿Admin',
                    amount: 1,
                    remarks: remarks,
                    date: new Date(),
                    Sum: variation,
                    balance: Number(user.Integral) - Number(variation),
                    status: '完成'
                })
            }
            await conn.commit();  //提交事务
            return "操作成功"
        } catch (err) {
            await conn.rollback();//回滚事务
            throw err;
            return "操作失败"
        }
    }

    async updateRecordStatus(rid) {
        const conn = await this.app.mysql.beginTransaction();
        try {
            await conn.update('record', {
                Status: '完成',
            }, {
                where: {
                    RecordID: rid
                }
            })
            await conn.commit();  //提交事务
            return "操作成功"
        } catch (err) {
            await conn.rollback();//回滚事务
            throw err;
            return "操作失败"
        }
    }
}

module.exports = Handle;