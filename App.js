var express = require('express'),
    http = require('http'),
    request = require('request'),
    bodyParser = require('body-parser'),
    errorHandler = require('express-error-handler'),
    app = express();

 
var dbOperations = require("./dbOperations.js");
var logFmt = require("logfmt");

app.set('views', __dirname + '/views') ;
app.use(express.static(__dirname + '/views'));
 

app.get('/' , function(req,res) {
    res.sendfile('views/index.html');
} );

app.get('/views/:fbid' , function(req,res) {
    console.log('in /views/fbid');
    //res.sendfile('views/index.html');
    res.redirect('/index.html?fbid='+req.params.fbid);
  
} );

app.get('/feedback/:fbid' , function(req,res) {
    console.log('inside /app.js-'+ req.params.fbid);
    // parse URL    
    //console.log(req);
    res.setHeader("Content-Type", "text/html");
    res.redirect('https://tmhq-jubjai.herokuapp.com/feedback.html?fbid='+req.params.fbid);  //change here

} );

app.get('/JubjaiBot' , function(req,res) {
    //console.log(req.params.fbid);
    res.redirect('https://m.me/JubjaiBot');
  
} );
app.get('/thankyou' , function(req,res) {
    //console.log(req.params.fbid);
    res.redirect('http://1.179.246.105:8080/jubjai/landingPage/');
} );

app.get('/db/readRecords', function(req,res){
    dbOperations.getRecords(req,res);
});

app.get('/db/addRecord', function(req,res){
    dbOperations.addRecord(req,res);
    var dname = 0;
    dname = req.query.fName.length % 2;
    console.log('dname='+dname);
    if (dname == 0)
        res.redirect('/feedback/'+req.query.fName);
    else 
        res.redirect('https://m.me/JubjaiBot');
});

app.get('/db/delRecord', function(req,res){
    dbOperations.delRecord(req,res);
});

app.get('/db/createTable', function(req,res){
    dbOperations.createTable(req,res);
});

app.get('/db/dropTable', function(req,res){
    dbOperations.dropTable(req,res);
}); 

app.set('port', process.env.PORT || 3001);

app.use(express.static(__dirname + '/client')); 
app.use(errorHandler());
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

