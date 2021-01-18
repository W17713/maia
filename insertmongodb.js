const agg = require('./aggregator');
const aggregator = new agg("mongodb://localhost:27017/","maia");



var data = [
    { user: 'James', text: 'Highway 79'},
    { user: 'Pete', text: 'streetlow 4'},
    { user: 'Amylia', text: 'Appl52'},
];
var collection = "Highlights";


//aggregator.put(data,collection);
//aggregator.get(collection);
var que = {_id: "6005481b00c5b241ec0094b2"};
var newque = {$set: {user: "Amylia",text: "Appl52153"}};
//console.log(newque);
aggregator.update(que,newque,collection);