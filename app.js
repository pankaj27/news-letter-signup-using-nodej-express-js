const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const path = require('path');
const https = require("https");
const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){

    res.sendFile(__dirname + "/signup.html");

});

app.post("/", function(req, res){
    const fname = req.body.firstname;
    const lname = req.body.lastname;
    const email = req.body.emailaddress;

    // console.log(fname);
    // console.log(lname);
    // console.log(email);

    const data = {
        members:[
            email_address : email,
            status : "Subscribed",
            merged_fields : {
                FNAME:fname,
                LNAME:lname
            }


        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://";
    const option = {
        method: "POST",
        auth: "pankaj:7253560c1538acd04432b1ee4c839529-us10"
    }
    const request = https.request(url, option, function(reponse){
        if(express.response.statusCode === 200){
            res.send("Successfully submitted");
        }else{
            res.send("Failed");
        }
    });

    request.write(jsonData);
    request.end();

});

app.listen(3000, function(req,res){
    console.log("Server is running on Port: 3000");
});

//API KEYS
//7253560c1538acd04432b1ee4c839529-us10

//LIST ID 
//311e97489c