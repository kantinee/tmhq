module.exports = {
    getRecords: function(req, res) {    
        var pg = require('pg');  
      
        //You can run command "heroku config" to see what is Database URL from Heroku belt
      
        //var conString = process.env.DATABASE_URL || "postgres://postgres:chatbot@localhost:5432/jubjai-bot-db";
        var conString = "postgres://postgres:chatbot@1.179.246.105:5432/jubjai-bot-db";
        var client = new pg.Client(conString);

        client.connect();

        var query = client.query("select * from tmhq");

        query.on("row", function (row, result) { 
            result.addRow(row); 
        });

        query.on("end", function (result) {          
            client.end();
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(JSON.stringify(result.rows, null, "    ") + "\n");
            res.end();  
        });
  },
  
    

    addRecord : function(req, res){
        var pg = require('pg');  
        
        //var conString = process.env.DATABASE_URL ||  "postgres://postgres:chatbot@localhost:5432/jubjai-bot-db";
        var conString = "postgres://postgres:chatbot@1.179.246.105:5432/jubjai-bot-db";
        var client = new pg.Client(conString);

        client.connect();
        var query = client.query("insert into tmhq (fbid,q1,q2,q3,q4,q5,q6,q7,q8,q9,q10,q11,q12,q13,q14,q15,q16,q17,q18,q19,q20) "+ 
                                "values ('"+req.query.fName+"','"+
                                req.query.q1+"','"+
                                req.query.q2+"','"+
                                req.query.q3+"','"+
                                req.query.q4+"','"+
                                req.query.q5+"','"+
                                req.query.q6+"','"+
                                req.query.q7+"','"+
                                req.query.q8+"','"+
                                req.query.q9+"','"+
                                req.query.q10+"','"+
                                req.query.q11+"','"+
                                req.query.q12+"','"+
                                req.query.q13+"','"+
                                req.query.q14+"','"+
                                req.query.q15+"','"+
                                req.query.q16+"','"+
                                req.query.q17+"','"+
                                req.query.q18+"','"+
                                req.query.q19+"','"+
                                req.query.q20+"')");
                                
    
        query.on("end", function (result) {          
            client.end(); 
            res.write('Success');
            res.end(); 
                        
            /*var dname = 0;
            dname = req.query.fName.length % 2;
            if (dname == 0)
                res.redirect('/feedback.html?fbid='+req.query.fName);
            else 
                res.redirect('https://m.me/JubjaiBot');*/
             
        });

    },
    addFeedback : function(req, res){
        
        console.write("in dbOperation addFeedback");
        
        var post_data = req.body;
        var pg = require('pg');  
        
        //var conString = process.env.DATABASE_URL ||  "postgres://postgres:chatbot@localhost:5432/jubjai-bot-db";
        //var conString = process.env.DATABASE_URL;
        var conString = "postgres://postgres:chatbot@1.179.246.105:5432/jubjai-bot-db";
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
    );
        
    }
    
    

    
};