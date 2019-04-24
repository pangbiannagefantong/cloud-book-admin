const request = require ('request')
const fs = require ('fs')
const cheerio = require ('cheerio')

request.get('https://www.kancloud.cn/kancloud/es6-in-depth/45513',(err,data) =>{
    if(err){
        console.log(err);
        return
    }
    const $ = cheerio.load(data.body)
    const content = $('.content').text()

    fs.writeFile('index.html',content,(err) =>{
        if(err){
            console.log(err)
        }
    })
    console.log(data.body);
    
})

//jsonwebtoken