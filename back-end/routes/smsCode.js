const {Router} = require ('express')
const router = Router()
const {smsCode} =require('../controller/smsCode')

router.post('/', smsCode)

module.exports = router