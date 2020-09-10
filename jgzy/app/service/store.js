'use strict';

const Service = require('egg').Service;

class Store extends Service {
    async getBy(type, page, pageSize = 30) {
        let list = null
        try {
            list = await this.app.mysql.select('goods', {
                // columns: [ 'id', 'name' ],
                where: {goodstype: type},
                orders: [['goodsid', 'esc']],
                limit: pageSize,
                offset: page * pageSize - pageSize
            })
        } catch (e) {
            console.log(e);
        }
        return {list};
    }
}

module.exports = Store;