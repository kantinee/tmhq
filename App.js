var express = require('express'),
    http = require('http'),
    request = require('request'),
    bodyParser = require('body-parser'),
    errorHandler = require('express-error-handler'),
    app = express();
    
    
    // for parsing application/json
    app.use(bodyParser.json());
    
    // for parsing application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));
    
    /*app.use(function forceLiveDomain(req, res, next) {
        // Don't allow user to hit Heroku now that we have a domain
        var host = req.get('Host');
        if (host === 'tmhq-jubjai.herokuapp.com') {
          return res.redirect(301, 'https://serviceworke.rs/' + req.originalUrl);
        }
        return next();
      });  */
    
 
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
    //res.redirect(301, 'http://yourotherdomain.com' + req.path)
    res.redirect(301,'/feedback.html?fbid='+req.params.fbid);  //change here

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
/*
app.post('/db/addFeedback', function(req,res){
    //app.use(bodyParser.urlencoded({ extended: false }));
    //app.use(bodyParser.json());
    console.log('in app.js');
    //console.log('in app.js: %j ',req);
    //dbOperations.addFeedback(req,res);
    //console.log('out app.js' + res);
    

});*/

app.post('/db/addFeedback', function (req, res, next) {
     
    var post_data = req.body;

    console.log(JSON.stringify(post_data));
    console.log(post_data.fName);
    var pg = require('pg');
    var conString = process.env.DATABASE_URL ||  "postgres://postgres:chatbot@localhost:5432/jubjai-bot-db";
    pg.connect(conString, function (err, client, done) {
      if (err) {
        // pass the error to the express error handler
        return next(err);
      }
      client.query('INSERT INTO feedback (fbid,age,sex,edu,job,email,qcb1,qcb2,qcb3,qcb4,goodcb,badcb,qq1,qq2,qq3,qq4,goodq,badq,qa1,qa2,qacomment) VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19, $20,$21 );', [post_data.fName,  post_data.age, post_data.sex ,post_data.edu,post_data.job, post_data.email, post_data.qcb1,post_data.qcb2, post_data.qcb3, post_data.qcb4, post_data.goodcb,post_data.badcb,post_data.qq1, post_data.qq2, post_data.qq3, post_data.qq4, post_data.goodq, post_data.badq, post_data.qa1,post_data.qa2,post_data.qacomment], function (err, result) {
        done(); //this done callback signals the pg driver that the connection can be closed or returned to the connection pool
  
        if (err) {
          // pass the error to the express error handler
          return next(err);
        }
        //res.set('location', 'https://www.google.com');
        //res.status(301).send();
        //res.send();
        res.redirect(301, 'http://1.179.246.105:8080/jubjai/landingPage/');
        // res.next();
        
      });
      
    });
  });

  
/*
  console.write("in dbOperation addFeedback");
  
  var post_data = req.body;
  var pg = require('pg');  
  
var conString = process.env.DATABASE_URL ||  "postgres://postgres:chatbot@localhost:5432/jubjai-bot-db";  
  //var conString = process.env.DATABASE_URL;
  var client = new pg.Client(conString);

  client.connect();
  //var query = client.query("insert into feedback (fbid,age,sex,edu,job,email,qcb1,qcb2,qcb3,qcb4,goodcb,badcb,qq1,qq2,qq3,qq4,goodq,badq,qa1,qa2,qacomment) "+ 
  //                        "values ('"+  post_data.fName +"','" + post_data.age +"','" + post_data.sex +"','" + post_data.edu+"','" + post_data.job+"','" + post_data.email+"','" + post_data.qcb1+"','" + post_data.qcb2+"','" + post_data.qcb3+"','" + post_data.qcb4+"','" + post_data.goodcb+"','" + post_data.badcb+"','" + post_data.qq1+"','" + post_data.qq2+"','" + post_data.qq3+"','" + post_data.qq4+"','" + post_data.goodq+"','" + post_data.badq+"','" + post_data.qa1+"','" + post_data.qa2+"','" + post_data.qacomment   +"')");
  var query = client.query("insert into feedback (fbid,age) "+ 
                          "values ('"+  post_data.fName +"','"+
                          post_data.age+"')");
                          
  query.on("end", function (result) {   
      //console.write(result);       
      client.end(); 
      res.write('Success');
      res.end();  
  }
);*/
  


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

