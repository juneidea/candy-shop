const router = require('express').Router();
const { User, Cart } = require('../db/models');

module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    let user = await User.findOne({where: {email: req.body.email}})
    if (req.body.guest) {
      if (!user) {
        user = await User.create({
          password: req.body.password,
          email: req.body.email,
          username: req.body.email
        })
        cart = await Cart.create({ userId: user.id, addressId: null });
  
        req.login(user, err => (err ? next(err) : res.json(user)))
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)))
      }
    } else {
      if (!user) {
        res.status(403)
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)))
      }
    }
  } catch (err) {
    next(err)
  }
});

router.post('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.get('/me', (req, res) => {
  res.json(req.user)
});
