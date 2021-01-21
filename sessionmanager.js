const app = require('express');
const session = require('express-session');
const redisClient = require('connect-redis');
const redis = require('redis');
var {v4: uuidv4} = require('uuid');


class Manager {
    createuserSession(){
        var sessID = uuidv4();
        return sessID;
    }
}

module.exports = Manager;