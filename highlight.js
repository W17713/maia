const { resolve } = require('path');
const aggregator = require('./aggregator');
const Agg = new aggregator("mongodb://localhost:27017/","maia");
const highCollection = 'Highlights';
const sharedCollection ='Shared';
class Highlight{
    constructor(){
    }

    deletepost(postid){
        Agg.delete(postid,highCollection);
    }

    getOrderedDocs(userid){
        
        return new Promise(function(resolve, reject){
            if(userid!==''){
            Agg.query({'userid':userid},highCollection).then(function(returndata){
                console.log({'userid':userid});
                console.log('returned data god');
                console.log(returndata);
                resolve(returndata);
            });
        }else{
            resolve('userid cannot be empty');
        }
        }); 
    }

    getTopics(userid,offset,limit){        
            return new Promise(function(resolve,reject){
                if(userid===undefined || userid==''){
                        resolve('userid or topic cannot be empty');
                    }else{
                        Agg.getOrdered({'userid':userid},"$topic",offset,limit,highCollection).then(function(docs){
                            //console.log('docs');
                            console.log(docs);
                            resolve(docs);
                        });
                    }
            });
    }

    shareTopic(senderID,topic,receiverID){//senderID,topic,receiverID
        return new Promise(function(resolve,reject){
            if(senderID=='' || topic == '' || receiverID==''){
           //     resolve('senderid,topic and receiver are all required');
            }else{//'sender':'60085c0464c4bc3cfc584c2c','topic': 'Photosynthesis','receiver':'6016d2a5fbda613e70ef7d42'
                const response = Agg.put([{'sender':senderID,'topic':topic,'receiver':receiverID}],sharedCollection);
                //
                console.log(response);
                resolve(response);
           }
        });
    }

    receivedTopics(myID){
       // const querydocs = this.getOrderedDocs;
        return new Promise(function(resolve,reject){
            if(myID===undefined || myID ==''){
                resolve('ID required to query');
            }else{
                /*Agg.query({'receiver':myID},sharedCollection).then(function(returned){
                    //console.log(returned);
                    resolve(returned);
                });*/
                return new Promise(function(resolve,reject){
                    Agg.query({ 'receiver': JSON.parse(myID)},sharedCollection).then(function(returned){
                        console.log('returned');
                        console.log('ID '+myID);
                        console.log(returned);
                        resolve(returned);
                    });
                }).catch(err=>{console.log('caught ',err.message)});
             /*   .then(function(returned){
                    //console.log(returned);
                    return new Promise(function(resolve,reject){
                        console.log('sender');
                        console.log(returned[0]['sender']);
                        querydocs(returned[0]['sender'],returned[0]['topic']).then(function(queried){
                            resolve(queried);
                        });
                    });
                }).catch(err=>{console.log('caught ',err.message)});*/
            }
        }).catch(err=>{console.log('caught ',err.message)});
    }
}

module.exports = Highlight;