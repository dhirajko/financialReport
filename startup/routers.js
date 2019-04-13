const user=require('../router/user')
const personalDetail=require('../router/personalDetail')
const userMangement=require('../controller/userManagement')
const login=require('../controller/login')


function routers(app) {
  app.use('/api/login',login)

  //user related api
  app.use('/api/user', user);
  app.use('/api/personaldetail', personalDetail);

  //management related api
  app.use('/api/user-management',userMangement)
  
  
}

module.exports = routers;
