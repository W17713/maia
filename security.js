var bcrypt = require('bcrypt');

 function encrypt(password){
    console.log('encrypting');
    return new Promise(function(resolve, reject){
        bcrypt.genSalt(10, function(err, salt){
            if(err) 
            {
                reject(err);
            }else{
                resolve(salt);
            }    
        });
    }).then(function(salt){
        return new Promise(function(resolve,reject){
            bcrypt.hash(password,salt,function(err, hash){
                if(err) 
                {
                    reject(err);
                }else
                {
                    resolve(hash);
                }
                console.log('encrypted');
        });
        });
    });
}

function compare(enteredPass,hashedpass){
        return new Promise(function(resolve,reject){
            bcrypt.compare(enteredPass,hashedpass,function(err,res){
                if(err) {
                    reject(err);
                }else{
                    resolve(res);
                }
            });
        });
    }



module.exports = {encrypt,compare}
 