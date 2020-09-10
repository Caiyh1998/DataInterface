const jwt = require('jsonwebtoken'); // 引入 jsonwebtoken

module.exports = async (ctx, next) => {
    if (ctx.request.header['authorization']) {
        let token = ctx.request.header['authorization']
        //解码token
        let decoded = jwt.decode(token, 'jianguozhuoyou');
        // ;的输出 ：{ user_id: '123123123', iat: 1494405235, exp: 1494405235 }
        if (token && decoded.exp <= new Date() / 1000) {
            ctx.status = 401;
            ctx.body = {
                message: 'invalid token'
            };
        } else {
            //如果权限没问题，那么交个下一个控制器处理
            ctx.query.uid = decoded.user_id
            return next();
        }
    } else {
        ctx.status = 401;
        ctx.body = {
            message: 'no token detected in http header "authorization"'
        }
    }
};
