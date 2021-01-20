var mongoclient = require('mongodb').MongoClient;
var objectID = require('mongodb').ObjectID;


class Aggregator {
       constructor(url,dbName){
        this.url = url;
        global.dbName = dbName;
        //console.log(this.dbName);
    }

    put(data,collectionName){
        mongoclient.connect(this.url, function(err,db){
            if(err) throw err;
            var dbo =  db.db(dbName);  
            dbo.collection(collectionName).insertMany(data, function(err,res){
                if(err) throw err;
                console.log(res);
                db.close();
            });        
        });
        
    }
    //get all documents
    get(collectionName){
        mongoclient.connect(this.url,function(err,db){
            if(err) throw err;
            var dbo = db.db(dbName);
            dbo.collection(collectionName).find({}).toArray(function(err,res){
                if(err) throw err;
                console.log(res);
                db.close;
            });

        });
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
                    console.log('db resolved');
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
                    }
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
    update(id,newValue,collectionName){
         mongoclient.connect(this.url,function(err,db){
            if(err) throw err;
            var dbo = db.db(dbName);
            var oldvalue = {_id:objectID(id)}
            var newvalue = {$set: newValue}
            dbo.collection(collectionName).updateOne(oldvalue,newvalue,function(err,res){
                if(err) throw err;
                console.log('res obj'+res)
                db.close;
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