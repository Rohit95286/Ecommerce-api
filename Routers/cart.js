const cartRouter = require("express").Router();
const JWTMiddleWare = require("../middleWare/jwtMiddleWare");
const Cart  =  require('./../models/cart')


cartRouter.post("/" , JWTMiddleWare ,async (req, res)=>{
    const{userId , products} =  req?.body ;
    try{
        const cart = new Cart({userId , products});
        console.log("here")
        const savedCart = await cart.save();
        res.status(200).send(savedCart)
    }
    catch(error){
       res.status(500).send("server error")
    }
})


cartRouter.put("/:id", JWTMiddleWare, async (req, res) => {
    const {id} = req?.params;
    const body = req?.body;
    try {
      const cartOfUser = await Cart.findById(id);
      Object.assign(cartOfUser, body);
      const savedUser = await cartOfUser.save();
      res.status(200).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });




  cartRouter.delete("/:id", JWTMiddleWare, async (req, res) => {
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json("Cart has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });


  cartRouter.get("/getUserCart/:userId", JWTMiddleWare, async (req, res) => {
    const {userId} = req?.params
    try {
      const cart = await Cart.find({ userId: userId }).populate({
        path: 'products.productId',
        select: 'name description model'
      })
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  });





module.exports = cartRouter;