const agg = require('./aggregator');
const user = require('./User');
const aggregator = new agg("mongodb://localhost:27017/","maia");
const User = new user;



var data = [
    { user: 'babel', password: 'Highway79'},
  
];
var collection = "Users";

var query = {user: 'Babel'}
//aggregator.put(data,collection);
//console.log(aggregator.query(query,collection));
//var que = "6005481b00c5b241ec0094b2";
//var newque = {user: "Amylia",text: "somenew 123"};
//console.log(newque);
//aggregator.update(que,newque,collection);
//aggregator.delete(que,collection);
User.signUp('jake','blvcc','blvcc');