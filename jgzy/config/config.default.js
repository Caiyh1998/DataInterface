/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1597026300928_2758';

  // add your middleware config here
  config.middleware = [];

  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: [ '*' ]
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };


  //mysql配置文件
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'Mm17793513291.',
      // password: 'root',
      // 数据库名
      database: 'JGZY_V3',
      //
      charset: 'utf8mb4'
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    rememberMe: 24 * 60 * 60 * 1000,
    // session : {
    //   key: 'EGG_SESS',
    //   maxAge: 10 * 1000, // 单位毫秒
    //   httpOnly: true,
    //   encrypt: true,
    // },
  };

  return {
    ...config,
    ...userConfig,
  };
};
