const path = require("path");
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//associate user with products production. AND cascade makes sure that when user is deleted then the products associated with user is also deleted
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product); //one user has many products (implied by belongsTo so optional)

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: CartItem }); // one cart can have multiple products
Product.belongsToMany(Cart, { through: CartItem }); //a single product can be in multiple carts

sequelize
  //.sync({ force: true }) //this overrides the if not exists
  .sync()
  .then((result) => {
    return User.findByPk(1);
    //console.log(result);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        name: "Mike",
        email: "test@test.com",
      });
    }
    return user;
  })
  .then((user) => {
    //console.log(user);
    return user.createCart();
  })
  .then((cart) => app.listen(3000))
  .catch((err) => {
    console.log(err);
  });
