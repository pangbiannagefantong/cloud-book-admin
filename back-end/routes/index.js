var express = require('express');
var router = express.Router();
const bookRoutes = require('./book')
const categoryRoutes = require('./category')
const titleRoutes = require('./title')
const articleRoutes = require('./article')
const userRoutes = require('./user')
const smsCodeRoutes = require('./smsCode')
const uploadRoutes = require('./upload')
const swiperRoutes = require('./swiper')
const collectionRoutes = require('./collection')
const readlistRoutes = require('./readlist')



router.use('/book',bookRoutes)
router.use('/category',categoryRoutes)
router.use('/title',titleRoutes)
router.use('/article',articleRoutes)
router.use('/smsCode',smsCodeRoutes)
router.use('/user',userRoutes)
router.use('/uploadToken',uploadRoutes)
router.use('/swiper',swiperRoutes)
router.use('/collection',collectionRoutes)
router.use('/readlist',readlistRoutes)


module.exports = router;
