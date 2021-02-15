var mongoclient = require('mongodb').MongoClient;
var objectID = require('mongodb').ObjectID;


class Aggregator {
       constructor(url,dbName){
        this.url = url;
        global.dbName = dbName;
        //console.log(this.dbName);
    }

    put(data,collectionName){
       if(data.length !==0){
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
    getOrdered(queryObj,identifier,offset, limit,collectionName){
        const start = (typeof(offset)!='undefined') ? parseInt(offset) : 0;
        const limited =(typeof(limit)!='undefined') ? parseInt(limit) : 10;
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
                //find({$query:queryObj,$orderby:{identifier:-1}})
                //console.log('start '+start);
                
                dbo.collection(collectionName).aggregate([{$group:{_id:identifier}},{$skip:start},{$limit:limited}]).toArray(function(err,items) {
                    if(err){
                        reject(err);
                    }else{
                        resolve(items);
                        //console.log(items);
                    }
                    db.close;
                });
            }).catch(err=>{console.log('caught ',err.message)});
        }); 
    }

    //query one collection
    query(query,collectionName,offset,limit){  
        const start = (typeof(offset)!='undefined') ? parseInt(offset) : 0;
        const limited =(typeof(limit)!='undefined') ? parseInt(limit) : 5;
        //console.log('start '+start);
        //console.log('limit '+limited);
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
                dbo.collection(collectionName).find(query).skip(start).limit(limited).toArray(function(err,items) {
                    if(err){
                        reject(err);
                    }else{
                        resolve(items);
                        console.log(items);
                    }
                    db.close;
                });
            }).catch(err=>{console.log('caught ',err.message)});
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
                dbo.collection(collectionName).updateOne(oldValue,{$set:newValue},function(err,res){
                    if(err) {
                        reject(err);
                    }else{
                        resolve(res);
                    }
                    db.close;
                });
            }).catch(err=>{console.log('caught ',err.message)});
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