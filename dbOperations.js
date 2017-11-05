module.exports = {
    getRecords: function(req, res) {    
        var pg = require('pg');  
      
        //You can run command "heroku config" to see what is Database URL from Heroku belt
      
        var conString = process.env.DATABASE_URL || "postgres://postgres:chatbot@localhost:5432/jubjai-bot-db";
        var client = new pg.Client(conString);

        client.connect();

        var query = client.query("select * from employee");

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
        
        var conString = process.env.DATABASE_URL ||  "postgres://postgres:chatbot@localhost:5432/jubjai-bot-db";
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
            /*
            var dname = 0;
            dname = req.query.fName.length % 2;
            if (dname == 0)
                res.redirect('/feedback.html?fbid='+req.query.fName);
            else 
                res.redirect('https://m.me/JubjaiBot');
            */
            res.end();  
        });

    },
    
     delRecord : function(req, res){
        var pg = require('pg');   
        
        var conString = process.env.DATABASE_URL ||  "postgres://postgres:chatbot@localhost:5432/jubjai-bot-db";
        var client = new pg.Client(conString);

        client.connect();
         
        var query = client.query( "Delete from employee Where id ="+req.query.id);
    
        query.on("end", function (result) {          
            client.end(); 
            res.write('Success');
            res.end();  
        });

    },
    
    createTable : function(req, res){
        var pg = require('pg');   
        
        var conString = process.env.DATABASE_URL ||  "postgres://postgres:chatbot@localhost:5432/jubjai-bot-db";
        var client = new pg.Client(conString);

        client.connect();
         
        var query = client.query( "CREATE TABLE tmhq"+
                                    "("+
                                    "fbid character varying(50),"+
                                    "q1 character varying(1),"+
                                    "q2 character varying(1),"+
                                    "q3 character varying(1),"+
                                    "q4 character varying(1),"+
                                    "q5 character varying(1),"+
                                    "q6 character varying(1),"+
                                    "q7 character varying(1),"+
                                    "q8 character varying(1),"+
                                    "q9 character varying(1),"+
                                    "q10 character varying(1),"+
                                    "q11 character varying(1),"+
                                    "q12 character varying(1),"+
                                    "q13 character varying(1),"+
                                    "q14 character varying(1),"+
                                    "q15 character varying(1),"+
                                    "q16 character varying(1),"+
                                    "q17 character varying(1),"+
                                    "q18 character varying(1),"+
                                    "q19 character varying(1),"+
                                    "q20 character varying(1),"+
                                    "id serial NOT NULL"+
                                  ")");
    
        query.on("end", function (result) {          
            client.end(); 
            res.write('Table Schema Created');
            res.end();  
        });

    },
    
    dropTable : function(req, res){
        var pg = require('pg');   
        
        var conString = process.env.DATABASE_URL || "postgres://postgres:chatbot@localhost:5432/jubjai-bot-db";
        var client = new pg.Client(conString);

        client.connect();
         
        var query = client.query( "Drop TABLE employee");
    
        query.on("end", function (result) {          
            client.end(); 
            res.write('Table Schema Deleted');
            res.end();  
        });

    }

    
};