const { test, expect } = require('@jest/globals');
const aggregate = require('../aggregator');
const highlight = require('../highlight');
const dbManager = require('../dbManager');
const DBman = new dbManager;
const newhighlight = new highlight;

    beforeAll(()=>DBman.start());
    afterAll(()=>DBman.stop());

test('get topics of user if user exist',()=>{
    newhighlight.getTopics('6017b06505201f401833cc9f').then(function(topics){
        expect(topics).not.toBeNull();
    });
});

test('return error if user does not exist',()=>{
    newhighlight.getTopics('').then(function(topics){
        expect(topics).toMatch(/userid cannot be empty/);
    });
});

//
test('new topic created ',()=>{
    newhighlight.shareTopic('6017b06505201f401833cc9f','Photosynthesis','6017b06505201f401833dd0g').then(function(resp){
        expect(resp).toBeUndefined();
    });
});

test('share parameters cannot be empty',()=>{
    newhighlight.shareTopic('','','').then(function(resp){
        expect(resp).toMatch(/senderid,topic and receiver are all required/);
    });
});

test('check userid of received topic',()=>{
    newhighlight.receivedTopics('6017b06505201f401833dd0g').then(function(resp){
        expect(resp[0]['sender']=='6017b06505201f401833cc9f').toBeTruthy();
    });
});

test('cannot check if receiver is not defined',()=>{
    newhighlight.receivedTopics('').then(function(resp){
        expect(resp).toMatch(/ID required to query/);
    });
});

test('query docs parameters cannot be empty',()=>{
    newhighlight.getOrderedDocs('','').then(function(resp){
        expect(resp).toMatch(/userid or topic cannot be empty/);
    })
});

test('returned values of query docs',()=>{
    newhighlight.getOrderedDocs('6017b06505201f401833cc9f','Photosynthesis').then(function(resp){
        expect(resp).not.toBeNull();
    })
});
