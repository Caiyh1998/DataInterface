'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken'); // 引入 jsonwebtoken

const LoginController = require('./login')

class RegisterController extends Controller {
    async user() {
        const ctx = this.ctx;
        const query = ctx.request.body

        const username = query.username
        const phoneCode = query.phoneCode
        const password = query.password
        const loginAuto = query.loginAuto

        try {
            if (await ctx.service.user.getByPh(phoneCode) !== null) {
                ctx.body = {
                    success: false,
                    message: '该手机号已注册'
                }
            } else if (await ctx.service.user.getByUN(username) !== null){
                ctx.body = {
                    success: false,
                    message: '该昵称已注册'
                }
            } else {
                const message = await ctx.service.user.register(username, phoneCode, password);
                if (message !== null){
                    ctx.body = {
                        message: '注册成功',
                        success: true,
                    };
                    // 如果用户勾选了 `自动登录`
                    if (loginAuto) {
                        const user = await ctx.service.user.login(phoneCode, password);
                        // 设置 Session
                        ctx.session.user = {username: user.username};

                        const token = jwt.sign({
                            user_id: user.UserID,      // user_id
                            user_name: user.Username // user_name
                        }, 'jianguozhuoyou', { // 秘钥
                            expiresIn: '86400s' // 过期时间
                        });
                        user.Password = null
                        ctx.body = {
                            code: 0,
                            data: user,
                            success: true,
                            message: '注册成功',
                            token: token
                        };
                    }
                }
                else {
                    ctx.body = {
                        success: false,
                        message: '注册失败'
                    };
                }
            }
        } catch (err) {
            console.log(err);
            ctx.throw(500, '出错');
        }
    }
}

module.exports = RegisterController;