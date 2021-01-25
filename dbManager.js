const mongoclient = require('mongodb');
const { MongoMemoryServer }  = require('mongodb-memory-server-global');

//jest.setTimeout(60000);

const COLLECTIONS =['Users','Highlights'];

class dbManager{
constructor(){
    this.server = new MongoMemoryServer();
    this.db=null;
    this.connection = null;
}

async start(){
    const url = await this.server.getUri();
    this.connection = await mongoclient.connect(url,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    });
    this.db = this.connection.db(await this.server.getDbName());
    console.log({url: url, db: await this.server.getDbName()});
    const dbINFO = {url: url, db: await this.server.getDbName()};
    return new Promise(function(resolve,reject){
        resolve(dbINFO);
    });
  
}

stop(){
    this.connection.close();
    return this.server.stop();
}

cleanup(){
    return Promise.all(COLLECTIONS.map((c)=>this.db.collection(c).deleteMany({})));
}
}

module.exports = dbManager;