'use strict';

const Controller = require('egg').Controller;

class User extends Controller {
    async getByID() {
        const ctx = this.ctx;

        const userId = ctx.params.id;
        const user = await ctx.service.user.getByID(userId);

        ctx.body = {
            data: {
                userInfo: user
            },
            success: true,
        };
    }

    async getAll() {
        const ctx = this.ctx

        const query = ctx.query
        const page = query.page

        const userList = await ctx.service.user.getAll(page);
        ctx.body = {
            data: {
                userList: userList,
                isEnd: false
            },
            success: true,
        };
    }

    async search() {
        const ctx = this.ctx;
        const query = ctx.query

        const search = query.search
        const page = query.page
        console.log(page);

        const user_list = await ctx.service.user.search(search, page)
        ctx.body = {
            data: {
                userList: user_list,
                isEnd: false
            },
            success: true,
        }
    }
}

module.exports = User;