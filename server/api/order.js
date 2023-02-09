const router = require('express').Router();
const { Order } = require('../db/models');

module.exports = router;

// Actual path: api/order/:orderId
// Admin only
router.put('/:orderId', async (req, res, next) => {
  try {
    if (req.user.dataValues.isAdmin) {
      const { order_status } = req.body;
      const order = await Order.findById(req.params.orderId);
      const final = await order.update({
        order_status
      });
      res.json(final);
    }
  } catch (err) {
    next();
  }
});
