var Agg = require('./aggregator');
const aggregator = new Agg("mongodb://localhost:27017/","maia");
var bcrypt = require('bcrypt');

var userCollection = 'Users';

class User {
    constructor(username,password){
        this.username;
        this.password;
    }

    encrypt(password){
        bcrypt.genSalt(10, function(err, salt){
            if(err) throw err;
            bcrypt.hash(password,salt,function(err, hash){
                if(err) throw err;
                return hash;
            });

        });
    }

    signUp(username,password,confirmpass){
        //filter username 
        //if username not found in users list
        var query = {"username": username}
        //console.log(query);
        //console.log(userCollection);
        aggregator.query(query,userCollection);
        
        //if user does not exist, add to users collection
        
           /* if(userqueryResult.length ==0)
                {
                     //if password matches confirmpass
                    if(password==confirmpass){
                        var encryptPass=encrypt(password);
                        var userData ={username: encryptPass};
                        aggregator.put(userData,userCollection);
                        console.log('user added');
                    }
                    
                }*/
    }
    //login
    //logout
    //getmycollections

}

module.exports = User;