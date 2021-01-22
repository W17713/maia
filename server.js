const express = require('express');
const session = require('express-session');
const router = express.Router();
const User = require('./user');
const newuser = new User;

const app = express();

router.post('/login',function(req,res){
    //get username from fe
    //get password from fe
    newuser.login(username,password).then(function(result){
        if(result){
            res.end(result);
        }else{
            res.end("failed)");
        }
        
    })
    
});