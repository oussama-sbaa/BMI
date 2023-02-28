
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3001


const fs = require('fs');
const https = require('https');
const path = require('path');
const key = fs.readFileSync('server.key');
const cert = fs.readFileSync( 'server.cert');
const options = { key, cert };


app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());       
app.use(bodyParser.urlencoded({ extended: true })); 

function BMIChecker( Weight,  Height) {
  var BMI = (Weight / ( Height * 2) ) * 100;  
  return BMI;
}

    
app.post('/api/imc', (req, res) => {
  console.log(req.body)
    var Weight = req.body.weight;
    var Height = req.body.height;
    BMI_Result = null;

    
    BMI_Result = BMIChecker( Weight, Height );
    console.log(BMI_Result);
    res.send({ BMI_Result });
   

       
})



https.createServer(options, app).listen(port, () => {
  console.log('App is running ! Go to https://localhost:'+port);
});