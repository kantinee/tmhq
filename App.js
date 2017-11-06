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
 

app.get('/' , function(req,res) {  //not use just for test site url
    res.sendfile('views/index.html');
} );

app.get('/views/:fbid' , function(req,res) { //not use glich call /index.html?fbid=....
    //console.log('in /views/fbid');
    //res.sendfile('views/index.html');
    res.redirect('/index.html?fbid='+req.params.fbid);
} );


app.get('/feedback/:fbid' , function(req,res) {
    //console.log('inside /app.js-'+ req.params.fbid);
    // parse URL    
    //console.log(req);
    //res.setHeader("Content-Type", "text/html");
    res.redirect('/feedback.html?fbid='+req.params.fbid);  //change here

} );

app.get('/JubjaiBot' , function(req,res) { //test ok
    //console.log(req.params.fbid);
    res.redirect('https://m.me/JubjaiBot');
  
} );
app.get('/thankyou' , function(req,res) { //test ok
    //console.log(req.params.fbid);
    res.redirect('http://1.179.246.105:8080/jubjai/landingPage/');
} );

app.get('/db/readRecords', function(req,res){
    dbOperations.getRecords(req,res);
});

app.get('/db/addRecord', function(req,res){
    dbOperations.addRecord(req,res);
        
   
});

app.post('/db/addFeedback', function(req,res){
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    //console.log('in app.js');
    console.log('in app.js: %j ',req);
    dbOperations.addFeedback(req,res);
    console.log('out app.js' + res);

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

