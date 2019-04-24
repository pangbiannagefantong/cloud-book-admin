const mongoose = require('mongoose')

const user = new mongoose.Schema({
    avatar: {
        type: String,
        default: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4065231704,3850269051&fm=26&gp=0.jpg'
    },
    phone: {
        type: Number,
        unique: true
    },
    password: String,
    username: String,
    desc: {
        type: String,
        default: '客官客官，说句话嘛'
    },
    // like: {
    //     type: Number,
    //     default: 0
    // },
    // read: {
    //     type: Number,
    //     default: 0
    // },
    // collections: {
    //     type: Number,
    //     default: 0
    // }
},{versionKey: false,timestamps:{createdAt: 'createTime', updatedAt: 'updateTime'}})

module.exports = mongoose.model('user',user)

