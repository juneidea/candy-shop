const router = require('express').Router()
const { CartItems, Cart, Address, Order } = require('../db/models')
// const nodemailer = require('nodemailer')
module.exports = router

// Actual path: /api/cart/user
// Get a current user cart
// Accessibility: current user
router.get('/user', async (req, res, next) => {
  try {
    const userCart = await Cart.findOne({
      where: { userId: req.user.dataValues.id, isPurchased: false},
      include: [{ model: Address }]
    })
    const items = await CartItems.findAll({
      where: { cartId: userCart.id },
    })
    res.json({id: userCart.id, items: items, address: userCart.address})
  } catch (err) {
    next(err)
  }
})

// Actual path: /api/cart/replace
// Replace with new cart
// Accessibility: current user
router.post('/replace', async (req, res, next) => {
  try {
    await Cart.destroy({
      where: { userId: req.user.dataValues.id, isPurchased: false}
    })
    const newCart = await Cart.create({ userId: req.user.dataValues.id, addressId: null });
    req.body.items.forEach( async (item) => {
      await CartItems.create({
        cartId: newCart.id,
        stockId: item.stockId,
        quantity: item.quantity
      })
    })
    res.json({id: newCart.id, items: []})
  } catch (err) {
    next(err)
  }
})

// Actual path: /api/cart/checkout
// Purchased cart checkout
// Accessibility: current user
router.get('/checkout', async (req, res, next) => {
  try {
    const purchasedCart = await Cart.findOne({
      where: { userId: req.user.dataValues.id, isPurchased: false}
    })
    await purchasedCart.update({
      isPurchased: true,
    })
    await Order.create({
      cartId: purchasedCart.id
    })
    await purchasedCart.destroy()
    const newCart = await Cart.create({ userId: req.user.dataValues.id, addressId: null });
    res.status(200).json({id: newCart.id, items: [], address: null})
  } catch (err) {
    next(err)
  }
})

// Actual path: /api/cart/:cartId
// Show all cart items
// Accessibility: all user
router.get('/:cartId', async (req, res, next) => {
  try {
    const singleCartView = await CartItems.findAll({
      where: { cartId: req.params.cartId }
    })
    res.json(singleCartView)
  } catch (err) {
    next(err)
  }
})



// Actual path: /api/cart/:cartId
// Adding candy item to single user's cart.
// Accessibility: user relate to the cart
router.post('/:cartId', async (req, res, next) => {
  try {
    await CartItems.create({
      cartId: req.params.cartId,
      stockId: req.body.stockId,
      quantity: req.body.quantity
    })
    const cartItems = await CartItems.findAll({
      where: { cartId: req.params.cartId }
    })
    res.status(200).json({id:req.params.cartId, items: cartItems})
  } catch (err) {
    next(err)
  }
})

// Actual path: /api/cart/:cartId
// Updating the number of quantity in the cart items list.
// Accessibility: user relate to the cart
router.put('/:cartId', async (req, res, next) => {
  try {
    const currentCartItem = await CartItems.findOne({
      where: {
        cartId: req.params.cartId,
        stockId: req.body.stockId
      }
    })
    await currentCartItem.update({
      quantity: req.body.quantity
    })
    const cartItems = await CartItems.findAll({
      where: { cartId: req.params.cartId }
    })
    res.status(200).json({id:req.params.cartId, items: cartItems})
  } catch (err) {
    next(err)
  }
})

// Actual path: /api/cart/:cartId
// Deleting an existing candy in the cart item list.
// Accessibility: user relate to the cart
router.delete('/:cartId', async (req, res, next) => {
  try {
    await CartItems.destroy({
      where: {
        cartId: req.params.cartId,
        stockId: req.body.stockId
      }
    })
    const cartItems = await CartItems.findAll({
      where: { cartId: req.params.cartId }
    })
    res.status(200).json({id:req.params.cartId, items: cartItems})
  } catch (err) {
    next(err)
  }
})