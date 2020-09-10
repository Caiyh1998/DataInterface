'use strict';

const Controller = require('egg').Controller;

class Other extends Controller {
    async get() {
        const ctx = this.ctx
        console.log('asdfghjkjhgfdfghjkjhgf',ctx);
        ctx.body = {
            'Access-Control-Allow-Origin': '*'
        };
    }
}

module.exports = Other;