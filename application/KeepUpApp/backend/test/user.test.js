import userVal from "../routes/userValidation"

describe('Register User', () => {

test('should be successful if email and password entered correctly', () => {
    expect (userVal({
        name:"testuser1",
        email:'testuser1@hmail.com',
        password:"Test@user1",
    })).toEqual({
        name:"testuser1",
        email:'testuser1@hmail.com',
        password:"Test@user1",
    })
})

test('should return null if email format is incorrect', () => {
    expect (userVal({
        name:"testuser1",
        email:'testuser1gmail',
        password:"testuser",
    })).toEqual(null)
})

test('should return null if password format is incorrect', () => {
    expect (userVal({
        name:"testuser1",
        email:'testuser1@gmail.com',
        password:"testuser",
    })).toEqual(null)
})

})