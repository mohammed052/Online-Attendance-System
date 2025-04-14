// controllers/userController.js
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const loginUser = async (req, res) => {
  const { email, password, role } = req.body
  try {
    const user = await User.login(email, password)
    if (user.role !== role) throw Error('Role mismatch')

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )
    res.status(200).json({
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

module.exports = { loginUser }
