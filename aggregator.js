var mongoclient = require('mongodb').MongoClient;
var objectID = require('mongodb').ObjectID;


class Aggregator {
       constructor(url,dbName){
        this.url = url;
        global.dbName = dbName;
        //console.log(this.dbName);
    }

    put(data,collectionName){
       if(data !=''){
        mongoclient.connect(this.url, function(err,db){
            if(err) throw err;
            var dbo =  db.db(dbName);  
            dbo.collection(collectionName).insertMany(data, function(err,res){
                if(err) throw err;
                //console.log(res);
                db.close();
            });        
        });
       }else{
           return 'cannot put empty data';
       }
        
    }
    //get all documents
    get(collectionName){
        var dburl=this.url;
        return new Promise(function(resolve,reject){
            mongoclient.connect(dburl,function(err,db){
                if(err){
                    reject(err);
                    console.log(err);
                }else{
                    resolve(db);
                }
            })
        }).then(function(db){
                return new Promise(function(resolve, reject){
                    var dbo = db.db(collectionName);
                        dbo.collection(collectionName).find({}).toArray(function(err,res){
                            if(err) {
                                console.log(err);
                                reject(err);
                            }else{
                                console.log(res);
                                resolve(res);                                
                            }
                           // db.close;
                        });
            });
        });
       /* mongoclient.connect(this.url,function(err,db){
            if(err) throw err;
            var dbo = db.db(dbName);
            dbo.collection(collectionName).find({}).toArray(function(err,res){
                if(err) throw err;
                console.log(res);
                db.close;
            });

        });*/
    }

    //query one collection
    query(query,collectionName){  
        var dburl = this.url;
        return new Promise(function(resolve, reject) {
            mongoclient.connect(dburl,function(err,db) {
                if(err){
                    reject(err);
                }else{
                    resolve(db);
                    //console.log('db resolved');
                }
            });
        }).then(function(db) {
            return new Promise(function(resolve, reject) {
                //console.log(db.db(dbName));
                var dbo = db.db(dbName);
                dbo.collection(collectionName).find(query).toArray(function(err,items) {
                    if(err){
                        reject(err);
                    }else{
                        resolve(items);
                        //console.log(items);
                    }
                    db.close;
                });
            });
        });  
    /*    mongoclient.connect(this.url,function(err,db){
            if(err) throw err;
            var dbo = db.db(dbName);
            
            dbo.collection(collectionName).find(query).toArray(function(err,res){
                if(err) throw err;
                db.close();
            });
            
        });*/
    }
    //Update document by ID
    update(oldValue,newValue,collectionName){
        var dburl = this.url;
         return new Promise(function(resolve,reject){
            mongoclient.connect(dburl,function(err,db){
                if(err) {
                    reject(err);
                }else{
                    resolve(db);
                } 
            });
         }).then(function(db){
            var dbo = db.db(dbName);
            return new Promise(function(resolve,reject){
                dbo.collection(collectionName).updateOne(oldValue,newValue,function(err,res){
                    if(err) {
                        reject(err);
                    }else{
                        resolve(res);
                    }
                    db.close;
                });
            });
         }); 
    }

    //delete document by ID 
    delete(id,collectionName){
        mongoclient.connect(this.url, function(err,db){
            if(err) throw err;
            var dbo = db.db(dbName);
            var delID = {_id:objectID(id)}
            dbo.collection(collectionName).deleteOne(delID,function(err,res){
                if(err) throw err;
                console.log('1 doc deleted');
                db.close();
            });
        });

    }
}

module.exports = Aggregator;