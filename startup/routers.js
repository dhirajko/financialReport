const user=require('../router/user')
const personalDetail=require('../router/personalDetail')
const userMangement=require('../controller/userManagement')
const login=require('../controller/login')
const accounts=require('../router/ledgerAccount')


function routers(app) {
  app.use('/api/login',login)

  //user related api
  app.use('/api/user', user);
  app.use('/api/personaldetail', personalDetail);
  app.use('/api/accounts',accounts)

  //management related api
  app.use('/api/user-management',userMangement)
  
  
}

module.exports = routers;
