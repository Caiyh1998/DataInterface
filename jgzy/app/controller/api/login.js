'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken'); // 引入 jsonwebtoken

class LoginController extends Controller {
    async user() {
        const ctx = this.ctx;
        const query = ctx.request.body

        const phoneCode = query.phoneCode
        const password = query.password
        const rememberMe = query.rememberMe

        try {
            const user = await ctx.service.user.login(phoneCode, password);
            if (user === "user_noexisted") {
                ctx.body = {
                    success: false,
                    errorMsg: '该手机号尚未注册'
                }
            } else if (user === "pass_error") {
                ctx.body = {
                    success: false,
                    errorMsg: '用户名或密码错误'
                }
            } else {
                // 设置 Session
                ctx.session.user = {username: user.username};

                // 如果用户勾选了 `记住我`，设置 的过期时间
                if (rememberMe) ctx.session.maxAge = this.config.rememberMe;

                const token = jwt.sign({
                    user_id: user.UserID,      // user_id
                    user_name: user.Username // user_name
                }, 'jianguozhuoyou', { // 秘钥
                    expiresIn: '86400s' // 过期时间
                });
                ctx.body = {
                    code: 0,
                    data: user,
                    success: true,
                    token: token
                };
            }
        } catch (err) {
            ctx.throw(500, '出错');
        }
    }

    async admin() {
        const ctx = this.ctx;
        const query = ctx.request.body

        const username = query.username
        const password = query.password
        const rememberMe = query.rememberMe

        try {
            const user = await ctx.service.admin.login(username, password);
            if (user === "user_noexisted") {
                ctx.body = {
                    success: false,
                    errorMsg: '用户名错误'
                }
            } else if (user === "pass_error") {
                ctx.body = {
                    success: false,
                    errorMsg: '密码错误'
                }
            } else {
                // 设置 Session
                ctx.session.user = {username: user.username};

                // 如果用户勾选了 `记住我`，设置 的过期时间
                if (rememberMe) ctx.session.maxAge = this.config.rememberMe;

                const token = jwt.sign({
                    user_id: user.AdminID,      // user_id
                    user_name: user.AdminName // user_name
                }, 'admin', { // 秘钥
                    expiresIn: '86400s' // 过期时间
                });
                console.log("签发管理员密钥");
                ctx.body = {
                    code: 0,
                    data: user,
                    success: true,
                    token: token
                };
            }
        } catch (err) {
            ctx.throw(500, '出错');
        }
    }
}

module.exports = LoginController;