const User = require('../models/User')
const middleWares = require('../middlewares')


//register user
exports.Register = async (req, res) => {
  try {
    let userInfo = await User.findOne({ email: req.body.email })
    if (userInfo) {
      return res.status(400).send('User with this email already exists')
    }

    const passwordDigest = await middleWares.hashPassword(req.body.password)

    let data = {
      email: req.body.email,
      password_digest: passwordDigest,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      
    }

    const newUser = await User.create(data)
    res.status(200).send(newUser)
  } catch (error) {
    throw error
  }
}

//login a user
exports.Login = async (req, res) => {
  try {
    const userInfo = await User.findOne({ email: req.body.email })
    if (!userInfo) {
      return res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
    }
    if (userInfo.lockUntil && userInfo.lockUntil > Date.now()) {
      return res.status(423).send({
        status: 'Error',
        msg: 'Account temporarily locked due to too many failed attempts. Try again later.'
      })
    }

    const matched = await middleWares.comparePassword(
      req.body.password,
      userInfo.password_digest
    )

    if (matched) {
      userInfo.failedLoginAttempts = 0
      userInfo.lockUntil = undefined
      await userInfo.save()

      let payload = {
        id: userInfo._id,
        email: userInfo.email,
        name: userInfo.first_name
      }
      let token = middleWares.createToken(payload)
      return res.status(200).send({ user: payload, token })
    }

    userInfo.failedLoginAttempts += 1
    if (userInfo.failedLoginAttempts >= 5) {
      // locks account for 10 minutes
      userInfo.lockUntil = Date.now() + 10 * 60 * 1000
    }
    await userInfo.save()

    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    throw error
  }
}


//update user pass
exports.UpdatePassword = async (req, res) => {
  try {
    const { id } = res.locals.payload

    let userInfo = await User.findById(id)
    if (!userInfo) {
      return res.status(404).send({ status: 'error', msg: 'user not found' })
    }

    if (!req.body.old_password || !req.body.new_password) {
      return res
        .status(400)
        .send({ status: 'error', msg: 'old and new passwords are required' })
    }

    const matched = await middleWares.comparePassword(
      req.body.old_password,
      userInfo.password_digest
    )

    if (matched) {
      const passwordDigest = await middleWares.hashPassword(
        req.body.new_password
      )
      userInfo = await User.findByIdAndUpdate(
        id,
        { password_digest: passwordDigest },
        { new: true }
      )

      const payload = {
        id: userInfo._id,
        email: userInfo.email,
        name: userInfo.first_name
      }
      return res
        .status(200)
        .send({ status: 'password updated successfully', user: payload })
    }

    res.status(401).send({ status: 'error', msg: 'update password failed' })
  } catch (error) {
    throw error
  }
}



//get profile
exports.getProfileById = async (req, res) => {
  try {
    const { id } = res.locals.payload
    const profile = await User.findById(id)

    if (!profile) return res.status(404).send({ msg: 'User not found' })

    res.status(200).send(profile)
  } catch (error) {
    throw error
  }
}


//delete
exports.deleteProfile = async (req, res) => {
  try {
    const { id } = res.locals.payload
    const deleted = await User.findByIdAndDelete(id)

    if (deleted)
      return res.status(200).send({ msg: 'User profile deleted', deleted })

    return res.status(404).send({ msg: 'User not found' })
  } catch (error) {
    throw error
  }
}


//update
exports.updateProfile = async (req, res) => {
  try {
    const { id } = res.locals.payload
    const updatedProfile = await User.findByIdAndUpdate(id, req.body, {
      new: true
    })

    if (!updatedProfile) return res.status(404).send({ msg: 'User not found' })

    res.status(200).send({ msg: 'User profile updated' })
  } catch (error) {
    throw error
  }
}
