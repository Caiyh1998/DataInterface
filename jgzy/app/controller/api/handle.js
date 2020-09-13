'use strict';

const Controller = require('egg').Controller;

class Handle extends Controller {
    async sendIntegral() {
        const ctx = this.ctx
        const query = ctx.query

        const from = query.uid;
        const to = query.phoneCode
        const integral = query.integral

        const message = await ctx.service.handle.sendIntegral(from, to, integral)
        const user = await ctx.service.user.getByID(from)

        ctx.body = {
            data: {
                userinfo: user
            },
            message: message,
            success: false
        };
        if (message === '操作成功') ctx.body.success = true
        else ctx.body.success = false
    }

    async buyone() {
        const ctx = this.ctx;
        const query = ctx.query

        const uid = query.uid;
        const gid = query.gid
        const remarks = query.remarks

        const message = await ctx.service.handle.buyone(uid, gid, remarks);
        const user = await ctx.service.user.getByID(uid)
        // const record = await ctx.service.record.getByID(uid)

        ctx.body = {
            data: {
                userinfo: user,
                // recordinfo: record
            },
            message: message,
            success: false
        };
        if (message === '操作成功') ctx.body.success = true
        else ctx.body.success = false
    }

    async exchange() {
        const ctx = this.ctx;
        const query = ctx.request.body
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

    async update() {
        const ctx = this.ctx;
        const query = ctx.request.body

        const userid = ctx.query.uid
        const username = query.username
        const phoneCode = query.phoneCode

        const message = await ctx.service.handle.update(userid, username, phoneCode);
        const user = await ctx.service.user.getByID(userid)
        ctx.body = {
            data: {
                userinfo: user
            },
            message: message,
            success: false
        };
        if (message === '操作成功') ctx.body.success = true
        else ctx.body.success = false
    }

    async updatePassword() {
        const ctx = this.ctx;
        const query = ctx.request.body

        const userid = ctx.query.uid
        const old_password = query.old_password
        const new_password = query.new_password

        const message = await ctx.service.handle.updatePassword(userid, old_password, new_password);
        const user = await ctx.service.user.getByID(userid)
        ctx.body = {
            data: {
                userinfo: user
            },
            message: message,
            success: false
        };
        if (message === '操作成功') ctx.body.success = true
        else ctx.body.success = false
    }

    async updateIntegral() {
        const ctx = this.ctx;
        const query = ctx.request.body

        const userid = query.uid
        const variation = query.variation
        const method = query.method
        const remarks = query.remarks

        const message = await ctx.service.handle.updateIntegral(userid, variation, method, remarks);
        ctx.body = {
            message: message,
            success: false
        };
        if (message === '操作成功') ctx.body.success = true
        else ctx.body.success = false
    }

    async updateRecordStatus() {
        const ctx = this.ctx;
        const query = ctx.query

        const rid = query.rid;

        const message = await ctx.service.handle.updateRecordStatus(rid);
        ctx.body = {
            message: message,
            success: false
        };
        if (message === '操作成功') ctx.body.success = true
        else ctx.body.success = false
    }
}

module.exports = Handle;