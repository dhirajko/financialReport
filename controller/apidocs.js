
const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path')


module.exports=()=>{
    const swaggerDefinition = {
        info: {
          title: 'financial report',
          version: '1.0.0',
          description: 'calculation of different account and profits',
        },
        host: 'localhost:3000',
        basePath: '/',
      };
      const options = {
        swaggerDefinition,
        apis: [path.resolve(__dirname+"/..", 'index.js')]
      };
       return swaggerJSDoc(options);
}


