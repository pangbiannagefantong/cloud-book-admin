const title = require('../model/title')
const mongoose = require('mongoose')


async function getTitle (req, res, next) {
    try {
        const bookId = req.params.id
        console.log(bookId)
        const data = await title.find({
            bookId: mongoose.Types.ObjectId(bookId)    
        })
        res.json({
            code: 200,
            data
        })
    } catch (err) {
        next(err)
    }
    
}

module.exports = {
    getTitle
}