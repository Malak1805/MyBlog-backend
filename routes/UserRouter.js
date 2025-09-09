const router = require('express').Router()
const User = require('../controllers/User')
const middleWares = require('../middlewares')

router.post('/login', User.Login)
router.post('/register', User.Register)
router.put(
  '',
  middleWares.stripToken,
  middleWares.verifyToken,
  User.UpdatePassword
)

router.put(
  '/profile',
  middleWares.stripToken,
  middleWares.verifyToken,
  User.updateProfile
)
router.get(
  '/profile',
  middleWares.stripToken,
  middleWares.verifyToken,
  User.getProfileById
)
router.put(
  '/profile',
  middleWares.stripToken,
  middleWares.verifyToken,
  User.updateProfile
)
router.delete(
  '',
  middleWares.stripToken,
  middleWares.verifyToken,
  User.deleteProfile
)
router.get(
  '/session',
  middleWares.stripToken,
  middleWares.verifyToken,
  middleWares.CheckSession
)

module.exports = router