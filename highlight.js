const aggregator = require('./aggregator');
const Agg = new aggregator("mongodb://localhost:27017/","maia");
const highCollection = 'Highlights';
class Highlight{
    constructor(){
    }

    deletepost(postid){
        Agg.delete(postid,highCollection);
    }
}

module.exports = Highlight;