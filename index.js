const express = require("express");
const ConnectDatabase = require("./db");
const app = express();
require("./utils/password");
const cors = require('cors');
const authRouter = require("./Routers/userAuth");
const productsRouter = require("./Routers/product");
const cartRouter = require("./Routers/cart");
const orderRouter = require("./Routers/order");

require("dotenv").config();
ConnectDatabase();

const port = 5000;
app.use(express.json()); 
app.use(cors());


app.use('/auth' , authRouter);
app.use('/product' , productsRouter)
app.use('/cart' , cartRouter)
app.use('/orders' , orderRouter)

app.listen(port, () => {
  console.log("backend is running" , port);
});
