const jwt = require('jsonwebtoken')
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTUzMTYzMjAsImRhdGEiOnsidXNlcklkIjoiMDAxIn0sImlhdCI6MTU1NTMxMjcyMH0.Q7D2JVtUQfCk6KoiLANPyCLFEGXuEM7T2e1y8XjtRPw'
jwt.verify(token, 'fantong', function(err, data){
    if(err) {
        console.log(err, 'err');
        
    }else{
        console.log(data);
        
    }
})