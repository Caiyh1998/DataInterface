'use strict';

const Service = require('egg').Service;

class Record extends Service {
    async get(status = 'all', page = 1, pageSize = 3) {
        let list = null
        if (status === 'all'){
            list = await this.app.mysql.select('record', {
                orders: [['Date', 'desc']],
                limit: pageSize,
                offset: page * pageSize - pageSize
            })
        }
        else if(status === '待办'){
            list = await this.app.mysql.select('record', {
                // columns: [ 'id', 'name' ],
                where: {status: status},
                orders: [['Date', 'desc']],
                limit: pageSize,
                offset: page * pageSize - pageSize
            })
        }
        else{
            list = await this.app.mysql.select('record', {
                // columns: [ 'id', 'name' ],
                where: {status: status},
                orders: [['Date', 'desc']],
                limit: pageSize,
                offset: page * pageSize - pageSize
            })
        }
        return list
    }

    async getBy(userid, type = 'all', page, pageSize = 30) {
        let list = null
        const user = await this.app.mysql.get('user', {userid: userid});
        if (type === 'all'){
            list = await this.app.mysql.select('record', {
                // columns: [ 'id', 'name' ],
                where: {from: user.UserName},
                orders: [['Date', 'desc']],
                limit: pageSize,
                offset: page * pageSize - pageSize
            })
        }
        else {
            list = await this.app.mysql.select('record', {
                // columns: [ 'id', 'name' ],
                where: {from: user.UserName,type: type},
                // orders: [['convert(username using gbk)', 'esc']],
                limit: pageSize,
                offset: page * pageSize - pageSize
            })
        }
        return list
    }

    async getByID(uid) {
        const record = await this.app.mysql.get('record', {userid: uid});
        return record;
    }

    async search(uid, search, page = 1, pageSize = 30) {
        const index = page * pageSize - pageSize
        const user = await this.app.mysql.get('user', {userid: uid});
        const search_sql = '%'+ search + '%'
        const list = await this.app.mysql.query(
            'select * from record where `from` = ? and (type like ? or date like ? or `to` like ? ) order by date desc limit ?,?',
            [user.UserName, search_sql, search_sql, search_sql, index, pageSize]
        )
        if(list === null){
            return 'noData'
        }
        return list
    }

    async searchAll(search, page = 1, pageSize = 3) {
        const index = page * pageSize - pageSize
        const search_sql = '%'+ search + '%'
        const list = await this.app.mysql.query(
            'select * from record where `from` like ? or status like ? or type like ? or date like ? or `to` like ? order by date desc limit ?,?',
            [search_sql, search_sql, search_sql, search_sql, search_sql, index, pageSize]
        )
        if(list === null){
            return 'noData'
        }
        return list
    }
}

module.exports = Record;