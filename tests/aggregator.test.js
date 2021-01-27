const aggregate = require('../aggregator');
const dbManager = require('../dbManager');
const DBman = new dbManager;
//beforeEach(()=>DBman.models);
    //afterEach(()=>DBman.cleanup());
    beforeAll(()=>DBman.start());
    afterAll(()=>DBman.stop());
    

test('insert user',()=>{
    DBman.start().then(function(result){
        const agg = new aggregate(result.url,result.db);
        const user = result.db.collection('Users');
        const mockUser = {username:'blvcc',password:'blvcc'};
        agg.put(mockUser,'Users');
        const insertedUser = agg.query(mockUser);
        expect(insertedUser).toEqual(mockUser);         
});   
});

test('insert highlight',()=>{
    DBman.start().then(function(result){
        const agg = new aggregate(result.url,result.db);
        const user = result.db.collection('Highlights');
        const mockHighlight = {username:'blvcc',text:'blvcc is the bible'};
        agg.put(mockHighlight,'Highlights');
        const insertedHigh = agg.query(mockHighlight);
        expect(insertedHigh).toEqual(mockHighlight);         
});   
});

test('get results', ()=>{
    DBman.start().then(function(result){
        const agg = new aggregate(result.url,result.db);
        const user = result.db.collection('Users');
        const returnedData= agg.get();
        expect(returnedData).toBeGreaterThan(0);         
});
    });

test('cannot insert empty array',()=>{
    DBman.start().then(function(results){
    const agg = new aggregate(result.url,result.db);
    const user = result.db.collection('Users');
    const res = agg.put({},'Users');
    expect(res).toMatch(/cannot put empty data/);

    });
});

test('update is successful',()=>{
    DBman.start().then(function(results){
    const agg = new aggregate(result.url,result.db);
    const user = result.db.collection('Users');
    const mockUpdate = {username:'blvcc123'};
    const returneduser = agg.query({username:'blvcc'},'Users');
    const returned = agg.update(returneduser.id,mockUpdate,'Users');
    expect(returned.username).toBe('blvcc123');
    });
});


test('check delete is successful',()=>{
  DBman.start().then(function(result){
    const agg = new aggregate(result.url,result.db);
    const user = result.db.collection('Users');
    const mockUser = {username:'patient0',password:'qwerty'};
    agg.put(mockUser,'Users');
    const returneduser = agg.query({username:'patient0'},'Users');
    const returned = agg.delete(returnedData.id,'Users');
    expect(returned).not.toContain('patient0');
  });
    
});