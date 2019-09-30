const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
var authenticateController=require('./controllers/authenticate-controller');
var registerController=require('./controllers/register-controller');
var hiscoreController=require('./controllers/hiscore-controller');
var statisticsController=require('./controllers/statistics-controller');
var newhiscoreController=require('./controllers/newhiscore-controller');
var connection = require('./config')

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/')),
app.post('/api/register',registerController.register);
app.post('/api/authenticate',authenticateController.authenticate);
app.post('/api/hiscores',hiscoreController.hiscores);
app.post('/api/statistics',statisticsController.statistics);
app.post('/api/newhiscore',newhiscoreController.newhiscore);

http = require('http').Server(app),

http.listen(3000, function(){
    console.log("Node server listening on port " + 3000);

});





