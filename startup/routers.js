const user=require('../router/user')
const personalDetail=require('../router/personalDetail')
const userMangement=require('../controller/userManagement')
const login=require('../controller/login')
const accounts=require('../router/accounts')
const transactions= require('../router/transaction')
const profitAndLossStatus= require('../router/profitandlossStatus')


function routers(app) {
  app.use('/api/login',login)

  //user related api
  app.use('/api/user', user);
  app.use('/api/personaldetail', personalDetail);
  app.use('/api/accounts',accounts)
  app.use('/api/transactions', transactions)
  app.use('/api/profit',profitAndLossStatus)

  //management related api
  app.use('/api/user-management',userMangement)
  
  
}

module.exports = routers;
