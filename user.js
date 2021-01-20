var Agg = require('./aggregator');
var secure = require('./security');
const aggregator = new Agg("mongodb://localhost:27017/","maia");
var userCollection = 'Users';

class User {
    constructor(){
        //aggregator;
    }

    

    signUp(username,password,confirmpass){
        //filter username 
        //if username not found in users list
        var query = {"username": username}
        //console.log(query);
        aggregator.query(query,userCollection).then(function(items){
            console.log(items.length);
            //if user does not exist, add to users collection
        
                if(items.length==0)
                    {
                        //if password matches confirmpass
                        if(password==confirmpass){
                            console.log('passwords are the same');
                            //hash and store passwords
                            secure.encrypt(password).then(function(hash){
                                var userData =[{'username': username,'password':hash}];
                                aggregator.put(userData,userCollection);
                                console.log('userData stored '+userData);
                            },function(err){
                                //log error if not resolved
                                console.log('there was an error: '+err);
                            });
                            
                            //aggregator.put(userData,userCollection);
                            //console.log('user added');
                        }
                        
                }else{
                    //handle when user exists
                }
        }, function(err){
            console.log('there was an error'+err);
        });
        
        //aggregator.query(query,userCollection);
    }
    //login
    login(username,password){
        //var query = {"username": username}
        //query with username, compare passwords 
        aggregator.query({"username": username},userCollection).then(function(userdata){
            secure.compare(password,userdata[0].password).then(function(res){
            //if match
                if(res){
                    //create use session
                    console.log('new user session');
                }else{

                }
            });  
                  
        });

    }
    //logout
    //getmycollections

}

module.exports = User;