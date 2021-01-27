const express = require('express');
const session = require('express-session');
const router = express.Router();
const User = require('./user');
const bodyParser = require('body-parser');
const newuser = new User;

const app = express();
app.use(bodyParser.json());
app.post('/postHighlights',function(req,res){
    console.log('request '+req.body.userdata);
    /*var requestBody = req.body;
    while(i>0){
       console.log(requestBody['key'+i]);
        i=i-1;
    }*/
    
    res.send('got a POST request');  
});

app.get('/',function(reg,res){
    res.send('take this response');
});

app.listen(3000,()=>{
    console.log('app listening on port 3000');
});