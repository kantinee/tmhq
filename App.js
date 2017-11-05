var express = require('express'),
    http = require('http'),
    request = require('request'),
    bodyParser = require('body-parser'),
    errorHandler = require('express-error-handler'),
    app = express();

 
var dbOperations = require("./dbOperations.js");
var logFmt = require("logfmt");

app.set('views', __dirname + '/views') ;
 

app.get('/' , function(req,res) {
    res.sendfile('views/index.html');
} );

app.get('/db/readRecords', function(req,res){
    dbOperations.getRecords(req,res);
});

app.get('/db/addRecord', function(req,res){
    dbOperations.addRecord(req,res);
    var dname = 0;
    dname = req.query.fName.length % 2;
    if (dname == 0)
        res.redirect('/feedback.html?fbid='+req.query.fName);
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
