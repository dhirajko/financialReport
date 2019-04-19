
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require("path");


const sslkey = fs.readFileSync(path.resolve(__dirname, 'ssl-key.pem'));
const sslcert = fs.readFileSync(path.resolve(__dirname,'ssl-cert.pem'));

const options = {
    key: sslkey,
    cert: sslcert
};


function redirection(application) {
    http.createServer((req, res) => {
        res.writeHead(301,
            {Location: 'https://financial-report.herokuapp.com'+ req.url });
        res.end();
    }).listen(3000);
    https.createServer(options, application).listen(process.env.PORT, ()=>{
        console.log('Listening to port : ',process.env.PORT);       
    })
}

module.exports = redirection;