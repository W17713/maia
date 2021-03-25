
const agg = require('./aggregator');
const user = require('./User');
//const high = require('./highlights');
const aggregator = new agg("mongodb://localhost:27017/","maia");
const User = new user;
//const Highlights = new high;
/*const sessmng = require('./sessionmanager');
const Manager = require('./sessionmanager');
const sess = new Manager;

const dbm = require('./dbManager');
const DBman = new dbm;*/
var data = [
    { sender:'60085c0464c4bc3cfc584c2c',topic: 'Photosynthesis',receiver:'6016d2a5fbda613e70ef7d42'} 
];
var collection = "Users";
const sharedCollection = 'Shared';
myID = "6016d2a5fbda613e70ef7d42";

var query = {user: 'Babel'}
//aggregator.put(data,'Shared');
//aggregator.get(collection);
//aggregator.query({},'Users');
aggregator.query({'receiver':"6016d2a5fbda613e70ef7d42"},sharedCollection);
//console.log(aggregator.query(query,collection));
//var que = "6005481b00c5b241ec0094b2";
//var newque = {user: "Amylia",text: "somenew 123"};
//console.log(newque);
//aggregator.update(que,newque,collection);
//aggregator.delete(que,collection);
//User.signUp('jake','blvcc','blvcc');
//User.login('jake','blvcc');
//User.getmyDocuments('60085c0464c4bc3cfc584c2c');
/*DBman.start().then(function(result){
    console.log(result);
});
*/