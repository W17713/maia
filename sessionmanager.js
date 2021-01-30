const express = require('express');
const session = require('express-session');
const connectRedis = require('connect-redis');
const redis = require('redis');
var {v4: uuidv4} = require('uuid');



class Manager {
    constructor(){
    var app = express();
    //this.sessID = uuidv4();
    //this.redisStore = connectRedis(session);
    this.redisClient = redis.createClient({
        host: 'localhost',
        port: 6379
    });
    this.redisClient.on('error', function (err) {
        console.log('Could not establish a connection with redis. ' + err);
    });
    this.redisClient.on('connect', function (res) {
        console.log('Connected to redis successfully');
    });
    }

    createuserSession(){
        //console.log(this.sessID);
        const app = express();
        const redisStore = new connectRedis(session);
        var sessInit = session(
            {
                genid: function(req){
                    return uuidv4();
                },
                secret:'blvcc',
                name:'secretsanta',
                store: new redisStore({client:this.redisClient}),
                resave: false,
                saveUninitialized: false,
                cookie: {secure: false, httpOnly:false, maxAge: 1000*60*10}
            }
        );
        return sessInit;

    }
}

module.exports = Manager;