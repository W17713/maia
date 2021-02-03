const aggregator = require('./aggregator');
const Agg = new aggregator("mongodb://localhost:27017/","maia");
const highCollection = 'Highlights';
class Highlight{
    constructor(){
    }

    deletepost(postid){
        Agg.delete(postid,highCollection);
    }

    getTopics(userid){
        return new Promise(function(resolve, reject){
            Agg.query({'userid':userid},highCollection).then(function(returndata){
                console.log({'userid':userid});
                console.log('returned data');
                console.log(returndata);
                resolve(returndata);
            });
        });
    }

    getOrderedDocs(topic){
        return new Promise(function(resolve,reject){
            Agg.getOrdered({'topic':topic},'orderno',highCollection).then(function(docs){
                console.log('docs');
                console.log(docs);
                resolve(docs);
            });
        });
    }

    shareTopics(senderID,topic,receiverID){
        return new Promise(function(resolve,reject){
            Agg.put({'sender':senderID,'topic':topic,'receiver':receiverID},'sharedCollection');
        });
    }

    receivedTopics(myID){
        return new Promise(function(resolve,reject){
            Agg.query({'receiver':myID},'sharedCollection').then(function(returned){
                console.log(returned);
            });
        });
    }
}

module.exports = Highlight;