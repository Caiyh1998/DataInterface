'use strict';

const Controller = require('egg').Controller;

class Home extends Controller {
    async get() {
        const ctx = this.ctx;
        try {
            const list = await this.app.mysql.select('user', {
                columns: [ 'Username', 'UserImage', 'Integral', 'Top' ],
                // where: {GoodsType: type},
                orders: [['Integral', 'desc']],
                limit: 3,
                offset: 0,
            })
            ctx.body = {
                data: {
                    banner: {
                        list: [{
                            image: "http://localhost:7001/public/JGZY_DATA/HOME_IMG/banner/banner01.jpeg",
                            link: "http://localhost:7001/public/JGZY_DATA/HOME_IMG/banner/banner01.jpeg"
                        },{
                            image: "http://localhost:7001/public/JGZY_DATA/HOME_IMG/banner/banner01.jpeg",
                            link: "http://localhost:7001/public/JGZY_DATA/HOME_IMG/banner/banner01.jpeg"
                        }]
                    },
                    top3: {
                        list: list
                    }
                },
                returnCode: "1001",
                returnMessage: null,
                success: true
            }
            ctx.body.data.imgsrc = "http://localhost:7001/public/JGZY_DATA/STORE_IMG/"
        }catch (e) {
            console.log(e);
            ctx.throw(500, 'service error');
        }


    }
}

module.exports = Home;