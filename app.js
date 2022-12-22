//jshint esversion: 6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;
    var status = "subscribed";
    console.log(fname, lname, email);

    var data = {
         members:[
            {
                email_address: email,
                status: status,
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
         ]
    };
    var jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/e82c1c1562";

    const options ={
        method: "POST",
        auth: "promi:b7a61fab6656347b702aa9d1dc42ddeb-us21"
    };

    if(res.statusCode == 200){
        res.sendFile(__dirname + "/success.html");
    }else{
        res.send(__dirname + "/failure.html");
    }

    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            //console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();

});

app.post("/failure", function(req, res) {
    res.redirect("/")
})

app.post("/success", function(req, res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is start on port 3000");
});

//API Key 
//b7a61fab6656347b702aa9d1dc42ddeb-us21

//List Key
//e82c1c1562