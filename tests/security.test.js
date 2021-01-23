const secure = require('../security');


test('should not return undefined',()=>{
    return secure.encrypt('password').then(data =>{
        expect(data).not.toBeUndefined();
    });
});

test('test password is correct when compared',()=>{
    return secure.encrypt('password').then(data =>{
        return secure.compare('password',data).then(dat =>{
            expect(dat).toBeTruthy();
        });
        
    });
});

test('test password is wrong when compared',()=>{
    return secure.encrypt('password').then(data =>{
        return secure.compare('wrongpassword',data).then(dat =>{
            expect(dat).toBeFalsy();
        });
        
    });
});

test('when no password is specified, return error string ',()=>{
    var response = secure.encrypt();
    expect(response).toMatch(/password cannot be empty/);
});