const Seqeulize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  status: {
    type: Seqeulize.ENUM('paid', 'shipping', 'complete'),
    defaultValue: 'paid'
  }
});

module.exports = Order;
