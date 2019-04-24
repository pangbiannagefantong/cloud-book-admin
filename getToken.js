const jwt = require('jsonwebtoken')

const token = jwt.sign({
    exp: Math.floor(Date.now() /1000) + (60 * 60),
    data: {
        userId: '001'
    }
},'fantong')

console.log(token);