const jwt = require('jsonwebtoken'); // 引入 jsonwebtoken

module.exports = async (ctx, next) => {
    if (ctx.request.header['authorization']) {
        let token = ctx.request.header['authorization']
        let isRight = true
        //解码token
        jwt.verify(token,'jianguozhuoyou',error => {
            if(error) {
                isRight = false
                console.log(error.message);
                return
            }
        })
        if(!isRight){
            ctx.status = 401;
            ctx.body = {
                message: 'invalid token'
            };
            return
        }
        const decode = jwt.decode(token);
        if (token && decode.exp <= new Date() / 1000) {
            ctx.status = 401;
            ctx.body = {
                message: 'invalid token'
            };
        } else {
            //如果权限没问题，那么交个下一个控制器处理
            ctx.query.uid = decode.user_id
            return next();
        }
    } else {
        ctx.status = 401;
        ctx.body = {
            message: 'no token detected in http header "authorization"'
        }
    }
};
