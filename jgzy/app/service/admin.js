'use strict';

const Service = require('egg').Service;

class Admin extends Service {
    async login(username, password) {
        const tuser = await this.app.mysql.get('admin', {adminname: username});
        if (tuser === null) {
            return "user_noexisted"
        } else if (tuser.Password !== password) {
            return "pass_error"
        }
        const user = {
            AdminID: tuser.AdminID,
            AdminName: tuser.AdminName,
            Type: tuser.Type
        }
        return user
    }
}

module.exports = Admin;