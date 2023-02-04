const db = require('../db');
const User = require('./user');
const Rating = require('./rating');
const Stock = require('./stock');
const Address = require('./address');
const Images = require('./images');
const CartItems = require('./cartItems');
const Cart = require('./cart');
const Category = require('./categories');
const Order = require('./order');
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Images.belongsTo(Stock);
Stock.hasMany(Images);

Cart.belongsTo(User);
User.hasMany(Cart);

Rating.belongsTo(User);
Rating.belongsTo(Stock);
User.hasMany(Rating);
Stock.hasMany(Rating);

Address.belongsTo(User);
User.hasMany(Address);
Cart.belongsTo(Address);
Address.hasMany(Cart);

CartItems.belongsTo(Cart);
CartItems.belongsTo(Stock);
Cart.hasMany(CartItems);

Stock.belongsToMany(Category, { through: 'StockCategory' });
Category.belongsToMany(Stock, { through: 'StockCategory' });

Order.belongsTo(Cart);
Cart.hasOne(Order);


module.exports = {
  User,
  Address,
  Stock,
  Rating,
  CartItems,
  Images,
  Cart,
  Order,
  Category
};
