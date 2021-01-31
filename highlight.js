const aggregator = require('./aggregator');
const Agg = new aggregator();
const highCollection = 'Highlights';
class Highlight{
    /*constructor(dburl,db){
        this.url = dburl;
        this.db = db;
    }*/

    deletepost(postid){
        Agg.delete(postid,highCollection);
    }
}