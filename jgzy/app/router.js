'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // router.get('/', controller.home.index);

  const checkToken = app.middleware.checkToken

  // user api
  // app.get('/api/user/:id', 'api.user.getByID');
  app.get('/api/user', 'api.user.getAll');
  app.get('/api/user/search', 'api.user.search');
  app.post('/api/login/user', 'api.login.user');
  app.post('/api/register/user', 'api.register.user');

  // home api
  app.get('/api/home/data','api.home.get')

  // goods api
  // app.get('/api/goods/data','api.goods.get')

  // store api
  app.get('/api/store/data','api.store.getBy')

  // record api
  app.get('/api/record/data', checkToken, 'api.record.getBy')
  app.get('/api/record/search', checkToken, 'api.record.search')
  app.get('/api/record/get', 'api.record.get')
  app.get('/api/record/searchAll', 'api.record.searchAll')

  // admin api
  // app.post('/api/login/admin', 'api.login.admin');

  // handle api
  app.get('/api/handle/send', checkToken, 'api.handle.sendIntegral')
  app.get('/api/handle/buyone', checkToken, 'api.handle.buyone')
  app.post('/api/handle/update', checkToken, 'api.handle.update')
  app.post('/api/handle/updatePassword', checkToken, 'api.handle.updatePassword')
  app.post('/api/handle/updateIntegral', 'api.handle.updateIntegral')

  //game api
  app.get('/api/game/data', checkToken, 'api.game.get')
  app.get('/api/game/signUp', checkToken, 'api.game.signUp')
  app.get('/api/game/create', 'api.game.create')
  app.get('/api/game/delete', 'api.game.delete')
  app.get('/api/game/get', 'api.game.get')

  //other
  // app.get('/api/sockjs-node/info', 'api.other.get')
  // app.post('/api/sockjs-node/info', 'api.other.get')

};
