const user=require('../router/user')
const personalDetail=require('../router/personalDetail')
const userMangement=require('../controller/userManagement')

function routers(app) {
  app.use('/api/user', user);
  app.use('/api/personal-detail', personalDetail);
  app.use('/api/user-management',userMangement)
}

module.exports = routers;
