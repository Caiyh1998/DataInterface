'use strict';

/** @type Egg.EggPlugin */
module.exports = {
    // had enabled by egg
    // static: {
    //   enable: true,
    // }，

    //mysql
    mysql: {
        enable: true,
        package: 'egg-mysql'
    },
    //cors
    cors: {
        enable: true,
        package: 'egg-cors'
    }
};
