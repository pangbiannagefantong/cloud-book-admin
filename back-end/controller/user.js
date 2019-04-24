const userModel = require('../model/user')
const validator = require('validator')
const smsCodeModel = require('../model/smsCode')
const signUtil = require('../utils/signToken')
const mongoose = require('mongoose')

async function register (req, res, next) { //用户注册
    try{       
        const {phone, code, password} = req.body
        const phoneStatus = validator.isMobilePhone(phone, 'zh-CN')
        if(phoneStatus){//手机号格式正确
            const user = await userModel.findOne({
                phone: phone
            })

            if(user){//用户注册过
                res.json({
                    code: 400,
                    msg: '您已经注册过了'
                })
            }else {//用户未注册，发送验证码
                const smsCode = await smsCodeModel.findOne({
                    code
                }).sort({_id: -1})

                if(smsCode){//判断是否发过验证码
                    let smsCodeDate = new Date(smsCode.updateTime)
                    let smsCodeTime = Math.round(smsCodeDate.getTime() / 1000)
                    let nowTime = Math.round(Date.now() / 1000)
                    if((nowTime - smsCodeTime) < 60 * 5){//验证码在有效期
                        if(code == smsCode.code) {//验证码正确
                            await userModel.create({
                                phone,
                                password
                            })
                            res.json({
                                code: 200,
                                msg: '注册成功'
                            })
                        } else{//验证码不正确
                            res.json({
                                code: 400,
                                msg: '验证码不正确'
                            })
                        }
                    } else {
                        res.json({//验证码已过期
                            code: 400,
                            msg: '验证码已过期'
                        })
                    }
                }else{//没有发过验证码
                    res.json({
                        code: 400,
                        msg: '验证码不正确'
                    })
                }
            }
        } else {//手机格式不正确
            res.json({
                code: 400,
                msg: '手机格式不正确'
            })
        }
    } catch (err){
        next(err)
    }
}

async function login (req, res, next) { //用户登录
    try {
        const {phone, password} = req.body
        if(phone && password) {
            const user = await userModel.findOne({
                phone
            })
            if(user){
                if(password == user.password){
                    const token = signUtil({userId: user._id})
                    res.json({
                        code: 200,
                        data: {
                            token
                        }
                    })
                } else {
                    res.json({
                        code: 400,
                        msg: '密码不正确'
                    })
                }
                
            }else{
                res.json({
                    code: 400,
                    msg: '用户不存在'
                })
            }
        } else {
            res.json({
                code: 400,
                msg: '缺少必要参数'
            })
        }
    } catch(err) {
        next(err)
    }
    

}

async function getUserById (req, res, next) { //获取用户信息
    try {
        const userId = req.user.userId
        const userData = await userModel.findById(mongoose.Types.ObjectId(userId)).select('-password')
        res.json({
            code: 200,
            data: userData
        })
    }catch(err) {
        next(err)
    }
}

async function changeUserAvatar (req, res, next) { //修改用户头像
    try {
        const {userId} = req.user
        const {avatar} = req.body
        const userData = await userModel.findOne(mongoose.Types.ObjectId(userId))
        if(userData) {
            await userData.set({
                avatar
            })
            await userData.save()
            res.json({
                code: 200,
                msg: '修改用户头像成功'
            })
        }else{
            res.json({
                code: 400,
                msg: '用户不存在'
            })
        }
    } catch (err) {
        next (err)
    }
}

async function changeUserName (req, res, next) { //修改用户昵称
    try {
        const {userId} = req.user
        const {username} = req.body
        const userData = await userModel.findOne(mongoose.Types.ObjectId(userId))
        if(userData) {
            await userData.set({
                username
            })
            await userData.save()
            res.json({
                code:200,
                msg: '修改用户昵称成功'
            })
        } else {
            res.json({
                code: 400,
                msg: '用户不存在'
            })
        }
    } catch (err) {
        next(err)
    }
}

async function changeUserDesc (req, res, next) { //修改用户个性签名
    try {
        const {userId} = req.user
        const {desc} = req.body
        const userData = await userModel.findOne(mongoose.Types.ObjectId(userId))
        if(userData) {
            await userData.set({
                desc
            })
            await userData.save()
            res.json({
                code:200,
                msg: '修改用户个性签名成功'
            })
        } else {
            res.json({
                code: 400,
                msg: '用户不存在'
            })
        }
    } catch (err) {
        next(err)
    }
}

async function changeUserPassword (req, res, next) {
    try {
        const {userId} = req.user
        const {password, changePassword} = req.body
        const userData = await userModel.findOne(mongoose.Types.ObjectId(userId))
        if(userData) {
            if(password === changePassword){
                res.json({
                    code: 400,
                    msg: '密码与原密码相同，请重新输入'
                })
            }else{
                await userData.set({
                    password: changePassword
                })
                await userData.save()
                res.json({
                    code: 200,
                    msg: '密码修改成功'
                })
            }
        } else{
            res.json({
                code: 400,
                msg: '用户不存在'
            })
        }
    } catch (err) {
        next(err)
    }
}



module.exports = {
    register,
    login,
    getUserById,
    changeUserAvatar,
    changeUserName,
    changeUserDesc,
    changeUserPassword
}