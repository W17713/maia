const express = require('express');
const session = require('express-session');
const router = express.Router();
const User = require('./user');
const Aggregate = require('./aggregator');
const bodyParser = require('body-parser');
const sessManager = require('./sessionmanager');
const { response } = require('express');
const newuser = new User("mongodb://localhost:27017/","maia");
const agg = new Aggregate("mongodb://localhost:27017/","maia");
const sessmng = new sessManager();
const highlight = require('./highlight');
const newHighlight = new highlight;

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var createsession = sessmng.createuserSession();
app.use(createsession);
app.post('/highlights',function(req,res){
    var i = 1;
    var j='';
    sess=req.session;
    if(sess.username && sess.password){
    while(i<Object.keys(req.body.userdata.data).length+1){
        j='key'+i.toString();
        //console.log('j is '+j);
        console.log(req.body.userdata.data[j]);
        //push each document to collection
        agg.put([{'userid':sess.userid,'date':req.body.userdata.date,'topic':req.body.userdata.topic,'text':req.body.userdata.data[j],'orderno':req.body.userdata[j].orderno}],'Highlights');
        i++;
    }
    res.sendStatus(200); 
}else{
    res.send('<p>cannot post if not logged in</p>');
}
});

app.get('/highlights',function(req,res){
    sess = req.session;
    if(sess.username && sess.password){
        newuser.getmyDocuments(sess.userid);
    }else{
        res.send('<p>You cannot view posts if you are not logged in</p>');
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
    if(results===true){
        //console.log(results);
        res.redirect('/login');
        
    }else{
        res.write(results);
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
            if(resp=='30001'){
                res.write('<p>user does not exist</p>');
            }else{
                res.send(resp[0]['_id']);
                console.log(resp[0]['_id']);
                res.write('<p>you can logout here</p>');
                sess.userid = resp[0]['_id'];
                console.log(sess.userid);
            }
            
            
        }
    }); 
});

app.post('/logout',function(req,res){
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
        }else{
            console.log('session destroyed');
            res.redirect('/login');
        }
    });
});

app.get('/home',function(req,res){
    res.write('<h1>welcome home</h>');
});

app.post('/changeusername',function(req,res){
    newuser.changeUsername(req.body.username,req.body.newusername,req.body.password).then(function(response){
        console.log(response);
        if(response.modifiedCount==1){
            res.write('<p>usrname changed</p>');
        }else{
            if(response=='30001'){
                res.write('<p>user entered does not exist</p>');
            }else{
                res.write('<p>wrong username or password. could not change username</p>');
            }
            
        }
    });
});

app.post('/changepass',function(req,res){
    newuser.changePassword(req.body.username,req.body.password,req.body.newpass).then(function(response){
        console.log(response);
        if(response.modifiedCount==1){
            res.write('<p>password changed</p>');
        }else{
            if(response=='30001'){
                res.write('<p>user entered does not exist</p>');
            }else{
                res.write('<p>wrong username or password. could not change username</p>');
            }
        }
    });
});

app.post('/delete',function(req,res){
    newHighlight.deletepost(req.body.postid);
});

app.listen(3000,()=>{
    console.log('app listening on port 3000');
});