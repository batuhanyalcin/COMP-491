const express= require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app=express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
var mysql = require('mysql');
// create a connection variable with the required details
var con = mysql.createConnection({
host: "db-balancemonitoring.cwjo9swcga53.eu-north-1.rds.amazonaws.com", // ip address of server running mysql
user: "admin", // user name to your mysql database
password: "eebgm491",// corresponding password
database: "balancemonitoringdb" // use the specified database
});

// make to connection to the database.
con.connect(function(err) {
    if (err) throw err;
// if connection is successful
console.log('connection successful');
});

app.get('/', (req,res) =>{
    res.json ('OK');
    //con.query("INSERT into PATIENT (PatientId, Pname, Email, PhoneNumber, Gender, Age, Weight, Height) VALUES ('20', 'EraySozer', 'eraysozer20@gmail.com', '05310845533', 'T', '23', '85', '190');");
})

app.post('/', (req,res)=>{
    console.log("Post Method");
    //var {name, rollno} = req.body;
    //var records = [[req.body.name, req.body.rollno]];
    //if(records[0][0]!=null)
    //{
        if(req.body.action == "register" || req.body.action == "test_result_entry"){
        var query = req.body.query;
        console.log(query);
        con.query(query);
        }


        if(req.body.action == "login"){
            var email = req.body.email;
            var password = req.body.password;
            
            var query = "SELECT * FROM PATIENT WHERE Email = '" + email + "'";
            console.log(query);
          
            con.query(query, function (error, results, fields) {
              if (error) {
                console.log(error);
                res.status(500).json({result:"error", error: 'An error occurred while executing the query.' });
              } else {
                if (results.length > 0) {
                  var storedPassword = results[0].PPassword;
                  if (password === storedPassword) {
                    var patientID = results[0].PatientID;
                    var pName = results[0].PName;
                    console.log('Email and password matched');
                    //console.log(patientID);
                    res.json({ result: true , patientID: patientID, pName: pName});
                  } else {
                    console.log('Password incorrect');
                    res.json({ result: false });
                  }
                } else {
                  console.log('Email not found');
                  res.json({ result: false });
                }
              }
            });
         }


         if (req.body.action == "test_result_retrieval") {
          var query = req.body.query;
          con.query(query, function (error, results, fields) {
            if (error) {
              console.log(error);
              res.status(500).json({result:"error", error: 'An error occurred while executing the query.' });
            }
            else {
              if (results.length > 0) {
                //console.log(results);
                res.json({ result: true, queryResult: results });
              } else {
                console.log('Patient not found');
                res.json({ result: false });
              }
            }
          });

         }
});





app.listen (19006, ()=>{
    console.log("Port 19006");
})