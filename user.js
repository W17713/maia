const { MongoClient } = require('mongodb');
var Agg = require('./aggregator');
var secure = require('./security');
//"mongodb://localhost:27017/","maia"
var userCollection = 'Users';
var highlightsCol ='Highlights';

class User {
    constructor(url,db){
        this.url=url;
        this.db = db;
        global.aggregator = new Agg(this.url,this.db);
    }

    
    
   signUp(username,email,password,confirmpass){
        if(username =='' || email =='' || password=='' || confirmpass==''){
            return 'parameters cannot be empty';
        }else{       
        var userquery = {"username": secure.filter(username)}
        var mailquery ={"email": secure.filter(email)}
        var query = {$or:[userquery,mailquery]}
        //check if email already exists
        global.aggregator.query(query,userCollection).then(function(returned){
           // if(returned.length==0){
        //if username not found in users list
        //this.aggregator.query(userquery,userCollection).then(function(items){
            //console.log(items.length);
            //if user does not exist, add to users collection
        
                if(returned.length==0)
                    {
                        console.log('user does not exist');
                        var decodedPass=secure.filter(password);
                        var decodedCPass=secure.filter(confirmpass);
                        //if password matches confirmpass
                        if(decodedPass==decodedCPass){
                            console.log('passwords are the same');
                            //hash and store passwords
                            secure.encrypt(decodedPass).then(function(hash){
                                var userData =[{'username': secure.filter(username),'email':secure.filter(email),'password':hash}];
                                global.aggregator.put(userData,userCollection);
                                global.aggregator.query({'username': secure.filter(username)},userCollection).then(function(res){
                                    console.log('resp '+res[0]['username']);
                                    if(res[0]['username']===secure.filter(username)){
                                        console.log(res[0]['username']);
                                        return true;
                                    }else{
                                        return 'user was not successfully created. Please try again';
                                    }
                                });
                                console.log('userData stored '+userData);
                            });
                        }
                        
                }else{
                    //console.log(returned[0]['username']);
                    //console.log(secure.filter(username));
                    //handle when user or email exists
                    if(returned[0]['username']==secure.filter(username)){
                        console.log(secure.filter(username)+' already exists');
                        return secure.filter(username)+' already exists';
                    }else{
                        //console.log(secure.filter(email)+' already exists');
                        return secure.filter(email)+' already exists';
                    }
                }
       // });

    //}
});
    }
        //aggregator.query(query,userCollection);
    }
    //login
    login(username,password){
        const decodeUser = secure.filter(username);
        const decodepass= secure.filter(password); 
        return new Promise(function(resolve,reject){ 
        global.aggregator.query({"username": decodeUser},userCollection).then(function(userdata){
            resolve(userdata); 
                  
        });
    }).then(function(userdata){
        return new Promise(function(resolve,reject){
            secure.compare(decodepass,userdata[0].password).then(function(res){
                if(res===true){
                    resolve(userdata);
                }else{
                    resolve(res);
                }
    });
    });
    });
    }
    //logout
    getmyDocuments(userid){
        //var query = {"userid":userid};
        
            global.aggregator.query({"userid":userid},highlightsCol).then(function(res){
                console.log(userid+'collection '+highlightsCol);
                console.log(res);
               
                return res;
            });
       
    }

    //change username
    changeUsername(oldname,newname,pass){
        const decodenewname = secure.filter(newname);
        //query to chcck user exists
        this.login(oldname,pass).then(function(res){
            if(res===true){
                //update with new pass
                global.aggregator.update(res[0]['username'],decodenewname,userCollection).then(function(resp){
                    console.log('username resp:'+resp);
                    return resp;
                });
            }else{
                return 'parameters were wrong';
            }
        });
        //update username
    }

    changePassword(username,oldpass,newpass){
        const userdecode=secure.filter(username);
        const newpassdecode=secure.filter(newpass);
        //check username and old password correct
        this.login(username,oldpass).then(function(res){
            if(res===true){
                const newpassword=secure.encrypt(newpassdecode).then(function(resultpass){
                    global.aggregator.update(res[0]['password'],resultpass,userCollection).then(function(resp){
                        console.log('password resp: '+resp);
                        return resp;
                    });
                });
                //update with new pass
                
            }else{
                return 'parameters were wrong';
            }
        });
    }

}

module.exports = User;