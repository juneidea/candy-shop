const router = require('express').Router()
const { User, Cart, Address } = require('../db/models')
const { requireLogin, requireAdmin } = require('./util')
module.exports = router

// All users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'isAdmin']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// Single user
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId },
      include: [{ model: Address }]
    })
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
})

// Check Admin
router.get('/admin/:userId', async (req, res, next) => {
  try {
    const user = await User.findAll({
      where: { isAdmin: true },
      attributes: ['id', 'email']
    })
    const admin = []
    user.forEach(u => admin.push(u.dataValues))
    res.json(!!admin.find(a => a.id === Number(req.params.userId)))
  } catch (err) {
    next(err)
  }
})

// Create user
router.post('/', async (req, res, next) => {
  try {
    const newUser = await User.create({
      sessionId: req.session.id,
      password: req.body.password,
      email: req.body.email
    })
    res.status(200).json(newUser)
  } catch (err) {
    next(err)
  }
})

// Update user
router.put('/:userId', async (req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.params.userId)
    const updatedUser = await currentUser.update(req.body)
    res.status(200).json(updatedUser)
  } catch (err) {
    next(err)
  }
})

// Remove user
router.delete('/:userId', requireAdmin, async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.params.userId
      }
    })
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

router.post('/address/:userId', async (req, res, next) => {
  try {
    const { street, firstName, lastName, city, state, zip } = req.body
    const newAddress = await Address.findOrCreate({
      where: {
        street,
        firstName,
        lastName,
        city,
        state,
        zip,
        userId: req.params.userId
      }
    })
    res.status(200).json([newAddress])
  } catch (err) {
    next(err)
  }
})

