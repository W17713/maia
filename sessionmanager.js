const express = require('express');
const session = require('express-session');
const connectRedis = require('connect-redis');
const redis = require('redis');
var {v4: uuidv4} = require('uuid');



class Manager {
    constructor(){
    var app = express();
    this.sessID = uuidv4();
    redisStore = connectRedis(session);
    const redisClient = redis.createClient({
        host: 'localhost',
        port: 6379
    });
    redisClient.on('error', function (err) {
        console.log('Could not establish a connection with redis. ' + err);
    });
    redisClient.on('connect', function (res) {
        console.log('Connected to redis successfully');
    });
    }

    createuserSession(){
        console.log(this.sessID);
        /*app.use(session(
            {
                genid: this.sessID,
                secret:'blvcc',
                store: new redisStore({client:redisClient}),
                resave: false,
                saveUninitialized: true,
                cookie: {secure: false, httpOnly:false, maxAge: 600000}
            }
        ));*/

    }
}

module.exports = Manager;