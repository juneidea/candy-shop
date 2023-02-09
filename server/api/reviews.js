const router = require('express').Router();
const { Rating } = require('../db/models');
module.exports = router;

// Actual path: /api/reviews/
router.post('/', async (req, res, next) => {
  try {
    const newReview = await Rating.create({
      review_text: req.body.review_text,
      stockId: req.body.stockId,
      userId: req.user.dataValues.id,
      rating_num: req.body.rating_num
    });
    res.status(200).json(newReview);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Rating.destroy({
      where: {
        id: req.params.id
      }
    });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});
