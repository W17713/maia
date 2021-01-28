const express = require('express');
const session = require('express-session');
const router = express.Router();
const User = require('./user');
const Aggregate = require('./aggregator');
const agg = new Aggregate("mongodb://localhost:27017/","maia");
const bodyParser = require('body-parser');
const newuser = new User("mongodb://localhost:27017/","maia");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.post('/postHighlights',function(req,res){
    
    var i = 1;
    var j='';
    //console.log('i is '+i);
    
    while(i<Object.keys(req.body.userdata.data).length+1){
        j='key'+i.toString();
        //console.log('j is '+j);
        console.log(req.body.userdata.data[j]);
        //push each document to collection
        agg.put({text:req.body.userdata.data[j]},'Highlights');
        i++;
    }
    
    res.sendStatus(200);  
});

app.get('/postHighlights',function(req,res){
    var userid= '60085c0464c4bc3cfc584c2c';
    /*agg.query({userid:userid},'Highlights').then(function(results){
        res.send(results);
    });*/
    newuser.getmyDocuments(userid);
});

app.post('/signup',function(req,res){
    var username=req.body.username;
    var email = req.body.email;
    var password=req.body.password;
    var confirmpass=req.body.confirmpass;
    console.log('username '+username);
    const results = newuser.signUp(username,email,password,confirmpass);
        res.send(results);
    
});

app.post('/login',function(req,res){
    console.log(req.body.username);
    const result = newuser.login(req.body.username,req.body.password);
    if(result===true){
        agg.query(req.body.username,req.body.password).then(function(resp){
            res.send(resp[0]['_id']);
        });
    }
});

app.listen(3000,()=>{
    console.log('app listening on port 3000');
});