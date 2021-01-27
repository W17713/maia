const user = require('../user');
const DBmanager = require('../dbManager');
const aggregate = require('../aggregator');
const dbm = new DBmanager;


beforeAll(()=>dbm.start());
afterAll(()=>dbm.stop());

test('get all documents of user',()=>{
    dbm.start().then(function(result){
        const agg = new aggregate(result.url,result.db);
        const newuser = new user(result.url,result.db);
        agg.query({username:'blvcc'}).then(function(data){
            newuser.getmyDocuments(data.userid).then(function(res){
                expect(res).not.toBeNull();
            });
        });
    });
});

test('must contain userid',()=>{
    dbm.start().then(function(result){
        const agg = new aggregate(result.url,result.db);
        const newuser = new user(result.url,result.db);
        agg.query({username:'blvcc'}).then(function(data){
            newuser.getmyDocuments(data.userid).then(function(res){
                expect(res).toContain('userid');
            });
        });
    });
});

test('user already exists',()=>{
    dbm.start().then(function(result){
        const newuser = new user(result.url,result.db);
        const rep= newuser.signUp('blvcc','password','conpass');
        expect(rep).toMatch(/user already exists/);
    });
});



test('parameters cannot be empty',()=>{
    dbm.start().then(function(result){
        const agg = new aggregate(result.url,result.db);
        const newuser = new user(result.url,result.db);
        const resp = newuser.signUp('','','');
        expect(resp).toMatch(/parameters cannot be empty/);
    });
});

test('user signup',()=>{
    dbm.start().then(function(result){
        const agg = new aggregate(result.url,result.db);
        const newuser = new user(result.url,result.db);
        const resp=newuser.signUp('janet','jackson','jackson');
        expect(resp).toBeTruthy();
    });
});


test('correct credentials must return true',()=>{
    dbm.start().then(function(result){
        const agg = new aggregate(result.url,result.db);
        const newuser = new user(result.url,result.db);
        const resp=newuser.login('janet','jackson');
        expect(resp).toBeTruthy();
    });
});

test('wrong credentials must return false',()=>{
    dbm.start().then(function(result){
        const agg = new aggregate(result.url,result.db);
        const newuser = new user(result.url,result.db);
        const resp=newuser.login('janet','jackson12345');
        expect(resp).toBeFalsy();
    });
})