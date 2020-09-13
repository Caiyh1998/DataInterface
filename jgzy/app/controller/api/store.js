'use strict';

const Controller = require('egg').Controller;

class Store extends Controller {
    async getBy() {
        const ctx = this.ctx;
        const query = ctx.query

        const type = query.type
        const page = query.page
        // const pageSize = query.pageSize

        try {
            const list = await ctx.service.store.getBy(type, page)
            ctx.body = {
                data: list,
                success: true,
                imgsrc: "http://47.93.49.16:7001/public/JGZY_DATA/STORE_IMG/"
            }
        }catch (e) {
            console.log(e);
            ctx.throw(500, 'service error');
        }


    }
}

module.exports = Store;