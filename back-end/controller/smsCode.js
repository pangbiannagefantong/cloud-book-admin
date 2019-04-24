const sms = require('../utils/smsUtil')
const smsModel = require('../model/smsCode')
const userModel = require('../model/user')


async function smsCode (req, res, next) {
    try {
        const {phone} = req.body
        const user = await userModel.findOne({
            phone
        })
        if(!user){  //如果用户没有注册，才可以注册发送验证码
            let sixStr = ''
            for(let i = 0; i < 6; i++){
                sixStr += Math.floor(Math.random() * 10) + ''
            }
            // console.log(sixStr);
            
            const smsRes = await sms(phone, sixStr)
            if(smsRes.Code == 'OK'){
                await smsModel.create({
                    phone,
                    code: sixStr
                })
                res.json({
                    code:200,
                    msg:'短信发送成功'
                })
            } else{
                res.json({
                    code: 500,
                    msg: smsRes.Code
                })
            }
        }else { //
            res.json({
                code: 400,
                msg: '对不起，您已经注册过了'
            })
        }
    } catch(err) {
        next(err)
    }
}

module.exports = {
    smsCode
}