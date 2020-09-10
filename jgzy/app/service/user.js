'use strict';

const Service = require('egg').Service;

class User extends Service {
    async login(phondCode, password) {
        const tuser = await this.app.mysql.get('user', {phoneCode: phondCode});
        if (tuser === null) {
            return "user_noexisted"
        } else if (tuser.Password !== password) {
            return "pass_error"
        }
        const user = {
            UserID: tuser.UserID,
            UserName: tuser.UserName,
            PhoneCode: tuser.PhoneCode,
            Integral: tuser.Integral
        }
        return user
    }

    async register(username, phondCode, password) {
        const message = await this.app.mysql.insert('user', {
            username: username,
            password: password,
            phonecode: phondCode,
            integral: 0,
        })
        return message
    }

    async getByID(uid) {
        const tuser = await this.app.mysql.get('user', {userid: uid});
        const user = {
            UserID: tuser.UserID,
            UserName: tuser.UserName,
            PhoneCode: tuser.PhoneCode,
            Integral: tuser.Integral
        }
        return user;
    }

    async getByPh(phone) {
        const user = await this.app.mysql.get('user', {phonecode: phone});
        return user;
    }

    async getByUN(username) {
        const user = await this.app.mysql.query(
            "SELECT IFNULL((select 'Y' from user where BINARY username = ? limit 1),'N')",
            [username]
        )
        let result = 'N'
        for (var i of user) {
            for (var k in i) {
                result = i[k]
            }
        }
        console.log(result);
        if(result === 'N')
            return null;
        return 'existed'
    }

    async getAll(page = 1, pageSize = 30) {
        const userList = await this.app.mysql.select('user', {
            columns: [ 'UserID', 'UserName', 'PhoneCode', 'Integral' ],
            // where: {GoodsType: type},
            orders: [['UserName', 'esc']],
            limit: pageSize,
            offset: page * pageSize - pageSize
        })
        return userList;
    }

    async search(search, page = 1, pageSize = 30) {
        const index = page * pageSize - pageSize
        const search_sql = '%'+ search + '%'
        const list = await this.app.mysql.query(
            'select UserID,UserName,PhoneCode,Integral from user where `UserName` like ? or PhoneCode like ? order by `UserName` limit ?,?',
            [search_sql, search_sql, index, pageSize]
        )
        if(list === []){
            return 'noData'
        }
        return list
    }

}

module.exports = User;