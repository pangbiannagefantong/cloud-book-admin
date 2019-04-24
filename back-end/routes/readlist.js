const {Router} = require('express')
const router = Router()
const {getReadlist} = require('../controller/readlist')
const auth = require('../controller/auth')

router.get('/',auth, getReadlist)

module.exports = router