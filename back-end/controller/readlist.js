const readlistModel = require('../model/readlist')
const mongoose =  require('mongoose')

async function getReadlist (req, res, next) {
    try{
        const {userId} = req.user
        const data = await readlistModel.find({
            user: mongoose.Types.ObjectId(userId)
        })
        .populate({path:'book'})
        .populate({path:'title'})
        if(data){
            res.json({
                code: 200,
                data
            })
        }else{
            res.json({
                code: 400,
                msg: '暂无阅读书籍'
            })
        }
    } catch(err){
        next(err)
    }
}

module.exports = {
    getReadlist
}