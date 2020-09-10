'use strict';

const Controller = require('egg').Controller;

class Record extends Controller {
    async get() {
        const ctx = this.ctx;
        const query = ctx.query

        const status = query.status
        const page = query.page

        const recordList = await ctx.service.record.get(status, page);
        ctx.body = {
            data: {
                list :recordList
            },
            success: true
        }
    }

    async getBy() {
        const ctx = this.ctx;
        const query = ctx.query

        const userid = query.uid
        const type = query.type
        const page = query.page

        const recordList = await ctx.service.record.getBy(userid, type, page);
        ctx.body = {
            data: {
                list :recordList
            },
            success: true
        }
    }

    async search() {
        const ctx = this.ctx;
        const query = ctx.query

        const userid = query.uid
        const search = query.search
        const page = query.page

        const record_list = await ctx.service.record.search(userid, search, page);
        ctx.body = {
            data: record_list,
            success: true,
            isEnd: false
        }
        if (record_list === 'noData'){
            ctx.body.success = false
        }
    }

    async searchAll() {
        const ctx = this.ctx;
        const query = ctx.query

        const search = query.search
        const page = query.page

        const record_list = await ctx.service.record.searchAll(search, page);
        ctx.body = {
            data: record_list,
            success: true,
            isEnd: false
        }
        if (record_list === 'noData'){
            ctx.body.success = false
        }
    }
}

module.exports = Record;