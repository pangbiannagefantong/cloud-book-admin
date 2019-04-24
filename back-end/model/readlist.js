const mongoose = require('mongoose')

const readlist = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },
    book: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'book'
    },
    title: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'title'
    }
},{versionKey:false,timestamps:{createdAt:'createTime',updatedAt: 'updateTime'}})


module.exports = mongoose.model('readlist',readlist)