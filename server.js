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
const newHighlight = new highlight();
const cors = require('cors');
const path = require('path');
const app = express();


app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var createsession = sessmng.createuserSession();
app.use(createsession);
app.post('/highlights',function(req,res){
    var i = 1;
    var j='';
    sess=req.session;
    //sess.username && sess.password
    if(true){
    while(i<Object.keys(req.body.userdata.data).length+1){
        j='key'+i.toString();
        //console.log('j is '+j);
        console.log(req.body.userdata.data[j]);
        //push each document to collection
        //sess.userid
        agg.put([{'userid':req.body.userdata.userid,'date':req.body.userdata.date,'topic':req.body.userdata.topic,'text':req.body.userdata.data[j],'orderno':req.body.userdata.data[j].orderno}],'Highlights');
        i++;
    }
    res.sendStatus(200); 
}else{
    res.send('<p>cannot post if not logged in</p>');
}
});


app.get('/highlights',function(req,res){
    //getmyDocuments
    const topic = req.query.topic;
    newuser.getmyDocuments('6017b06505201f401833cc9f',0,10).then(function(response){
        res.json(response);
    });
    

});


app.post('/signup',function(req,res){
    sess=req.session;
    const username=req.body.username;
    const email = req.body.email;
    const password=req.body.password;
    const confirmpass=req.body.confirmpass;
    //console.log('username '+username);
    newuser.signUp(username,email,password,confirmpass).then(function(results)
    {
        if(results===true)
        {
            console.log(results);
            res.json({'resp':'success'});
            
        }else
        {
            console.log('server resp '+results);
            res.json(results);
        }

    });
    
    
});

app.post('/login',function(req,res){
    //console.log(req.body.username);
    sess = req.session;
    sess.username = req.body.username;
    sess.password = req.body.password;

    newuser.login(req.body.username,req.body.password).then(function(resp){
        console.log(resp);
        if(resp===false){
            res.json({'resp': 'failure'});
        }else{
            if(resp=='30001'){
                res.json({'resp': 'user does not exist'});
            }else{
                sess.userid = resp[0]['_id'];
                sess.username=resp[0]['username'];
                res.json({'resp':'success','data':sess.userid,'username':sess.username});
                /*console.log(resp[0]['_id']);
                res.write('<p>you can logout here</p>');
                sess.userid = resp[0]['_id'];
                console.log(sess.userid);*/
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
    const limit = (typeof(req.query.limit)!='undefined') ?  req.query.limit : 5;
    const start = (typeof(req.query.offset)!='undefined') ?  req.query.offset : 0;
    const userid = (typeof(req.query.user)!='undefined') ?  req.query.user : null;
    console.log(req.query);
    console.log('start '+userid);
  //  if(sess.username && sess.password){ 
        newHighlight.getTopics(userid,start,limit).then(function(response){
            //const topicObj = Object.assign({},response.topic);
            //res.setHeader('Content-Type', 'application/json');
            res.send(response);
        });
    /*newHighlight.getOrderedDocs('Photosynthesis').then(function(docs){
        const documents = Object.assign({},docs);
        res.json(documents);
    });*/

    /*newHighlight.shareTopic('6017b06505201f401833cc9f','Photosynthesis','6017b06505201f401833dd0g').then(function(response){
        res.send(response);
    });*/

    /*newHighlight.receivedTopics('6017b06505201f401833dd0g').then(function(response){
        res.send(response);
    });*/
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

app.post('/deletehigh',function(req,res){
    newHighlight.deletepost(req.body.postid);
    res.write('<p>post deleted</p>');
});
//set port=2000 && 
app.get('/',function(req,res){
   res.sendFile(path.join(path.join(__dirname,'maia_webclient/client'),"public","index.html"));
});

app.listen(3080,()=>{
    console.log('app listening on port 3080');
});