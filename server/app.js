
const express = require('express');
const fs = require('fs');
const app = express();
let allDataLogs = [];


fs.writeFile('log.csv', "Agent,Time,Method,Resource,Version,Status", (err) => {
    if (err) throw err;
    
  });


app.use((req, res, next) => {
    // write your logging code here
    var timestamp = new Date();
    var logData = [];
    var logObject = {};

    
    logData.push(req.headers['user-agent']);
    logObject.Agent = req.headers['user-agent'];
   
    logData.push(timestamp.toISOString());
    logObject.Time = timestamp.toISOString();
    
    logData.push(req.method);
    logObject.Method = req.method;
    
    logData.push(req.originalUrl);
    logObject.Resource = req.originalUrl;
    
    logData.push("HTTP/" + req.httpVersion);
    logObject.Version = "HTTP/" + req.httpVersion;
    
    logData.push(res.statusCode);
    logObject.Status = res.statusCode;

    allDataLogs.push(logObject);
     
    fs.appendFile(__dirname + '/log.csv', logData, (err) => {
        if (err) throw err;
        
      });
    
      console.log(logData.toString());

    next();
});

app.get('/', (req, res) => {
// write your code to respond "ok" here
res.send("Ok. Request received.")
});

app.get('/logs', (req, res) => {
// write your code to return a json object containing the log data here

res.send(allDataLogs);

});

module.exports = app;