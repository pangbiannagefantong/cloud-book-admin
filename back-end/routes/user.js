const {Router} = require('express')
const router = Router()
const {register, login, getUserById, changeUserAvatar, changeUserName, changeUserDesc, changeUserPassword} = require('../controller/user')
const auth = require('../controller/auth')


router.post('/register',register)
router.post('/login',login)
router.get('/',auth,getUserById)
router.post('/changeUserAvatar',auth, changeUserAvatar)
router.post('/changeUserName', auth, changeUserName)
router.post('/changeUserDesc', auth, changeUserDesc)
router.post('/changeUserPassword', auth, changeUserPassword)

module.exports = router


