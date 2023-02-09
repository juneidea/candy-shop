const router = require('express').Router();
const {
  Stock,
  Rating,
  Images,
  Category
} = require('../db/models');

module.exports = router;

// Actual path: /api/stocks/
// GET all stocks
// Accessibility: For all users
router.get('/', async (req, res, next) => {
  try {
    const stocks = await Stock.findAll({
      include: [{ model: Images }, { model: Category }]
    });
    res.json(stocks);
  } catch (err) {
    next(err);
  }
});

// Actual path: /api/stocks/:stockId
// GET single candy
// Accessibility: For all users
router.get('/:stockId', async (req, res, next) => {
  try {
    const candy = await Stock.findOne({ where: { id: req.params.stockId },
      include: [
        { model: Rating,
        attributes : ['id','rating_num','review_text','stockId'],
        separate : true, 
        limit: 4,
        order: [['id', 'DESC'],]
        }, 
        { model: Images }, 
        { model: Category }
      ],
    });
    res.status(200).json(candy);
  } catch (err) {
    next(err);
  }
});

// Actual path: /api/stocks
// Create a new candy product(stock).
// Accessibility: For Admin only
router.post('/', async (req, res, next) => {
  try {
    if (req.user.dataValues.isAdmin) {
      const newCandy = await Stock.create({
        name: req.body.name,
        description: req.body.description,
        quantity: req.body.quantity,
        price: req.body.price,
        brand: req.body.brand,
        images: [{ id: 0, imageUrl: '/images/candy10-1.png' }]
      });
      res.status(200).json(newCandy);
    }
  } catch (err) {
    next(err);
  }
});

// Actual path: /api/stocks/:stockId
// Updating an existing candy
// Accessibility: For Admin only
router.put('/:stockId', async (req, res, next) => {
  try {
    if (req.user.dataValues.isAdmin) {
      const oldCandy = await Stock.findByPk(req.params.stockId);
      const updatedCandy = await oldCandy.update(req.body);
      res.status(200).json(updatedCandy);
    }
  } catch (err) {
    next(err);
  }
});

// Actual path: /api/stocks/:stockId
// Deleting an existing candy
// Accessibility: For Admin only
router.delete('/:stockId', async (req, res, next) => {
  try {
    if (req.user.dataValues.isAdmin) {
      await Stock.destroy({
        where: {
          id: req.params.stockId
        }
      });
    }
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});