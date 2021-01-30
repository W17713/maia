const express = require('express');
const session = require('express-session');
const router = express.Router();
const User = require('./user');
const Aggregate = require('./aggregator');
const bodyParser = require('body-parser');
const sessManager = require('./sessionmanager');
const newuser = new User("mongodb://localhost:27017/","maia");
const agg = new Aggregate("mongodb://localhost:27017/","maia");
const sessmng = new sessManager();

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var createsession = sessmng.createuserSession();
app.use(createsession);
app.post('/postHighlights',function(req,res){
    var i = 1;
    var j='';
    
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
    sess = req.session;
    if(sess.username && sess.password){
        newuser.getmyDocuments(sess.userid);
    }
   
});

app.post('/signup',function(req,res){
    sess=req.session;
    const username=req.body.username;
    const email = req.body.email;
    const password=req.body.password;
    const confirmpass=req.body.confirmpass;
    //console.log('username '+username);
    const results = newuser.signUp(username,email,password,confirmpass);
    if(results){
        res.redirect('/login');
    }
    
});

app.post('/login',function(req,res){
    //console.log(req.body.username);
    sess = req.session;
    sess.username = req.body.username;
    sess.password = req.body.password;

    newuser.login(req.body.username,req.body.password).then(function(resp){
        console.log(resp);
        if(resp===false){
            res.write('<p>false</p>');
        }else{
            res.write('<p>you can logout here</p>');
            //res.redirect('/home');
        }
    }); 
});

app.post('/logout',function(req,res){
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect('/login');
        }
    });
});

app.get('/home',function(req,res){
    res.write('<h1>welcome home</h>');
});

app.listen(3000,()=>{
    console.log('app listening on port 3000');
});