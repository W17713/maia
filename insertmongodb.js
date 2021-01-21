const agg = require('./aggregator');
const user = require('./User');
const aggregator = new agg("mongodb://localhost:27017/","maia");
const User = new user;
const sessmng = require('./sessionmanager');
const Manager = require('./sessionmanager');
const sess = new Manager;



var data = [
    { userid:'60085c0464c4bc3cfc584c2c',user: 'babel', text: 'This is my text'}
];
var collection = "Users";

var query = {user: 'Babel'}
//aggregator.put(data,'Highlights');
//aggregator.get(collection);
//aggregator.query({},'Highlights');
//console.log(aggregator.query(query,collection));
//var que = "6005481b00c5b241ec0094b2";
//var newque = {user: "Amylia",text: "somenew 123"};
//console.log(newque);
//aggregator.update(que,newque,collection);
//aggregator.delete(que,collection);
//User.signUp('jake','blvcc','blvcc');
//User.login('jake','blvcc');
//User.getmyDocuments('60085c0464c4bc3cfc584c2c');

console.log(sess.createuserSession());