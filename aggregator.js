var mongoclient = require('mongodb').MongoClient;


class Aggregator {
       constructor(url,dbName){
        this.url = url;
        global.dbName = dbName;
        //console.log(this.dbName);
    }

    put(data,collectionName){
        //console.log(this.url);
        //console.log(this.dbName);
        mongoclient.connect(this.url, function(err,db){
            if(err) throw err;
            var dbo =  db.db(dbName);
            //console.log(dbo);
            //console.log(this.dbo);   
            dbo.collection(collectionName).insertMany(data, function(err,res){
                if(err) throw err;
                console.log(res);
                db.close();
            });        
        });
        
    }

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

    update(quer,newValue,collectionName){
         mongoclient.connect(this.url,function(err,db){
            //console.log('old: '+quer);
            if(err) throw err;
            var dbo = db.db(dbName);
            
            dbo.collection(collectionName).updateMany(quer,newValue,function(err,res){
                console.log('old: '+quer);
                if(err) throw err;
                console.log('new value:'+res)
                db.close;
            }); 
        });
    }
}

module.exports = Aggregator;