const orderRouter = require('express').Router();
const JWTMiddleWare = require('../middleWare/jwtMiddleWare');
const order = require('./../models/order')


// JWT middleware ==
orderRouter.post("/" , JWTMiddleWare  ,async (req, res)=>{
   const {userId , adress , status ,products} = req?.body;
 try{
      const orderData = new order({userId , adress , status ,products});
      const savedorder = await orderData.save();
      res.status(200).send(savedorder);
  }
 catch(error){
      res.status(500).send(error);
  }
});

//=====  update cart  =====
orderRouter.put('/:id' , JWTMiddleWare , async (req , res)=>{
  const {id} = req?.params;
  const {body} = req;
  try{
    const getorder = await order.findById(id);
    Object.assign(getorder , body);
    const updatedUser = await getorder.save()
    res.status(200).send(updatedUser);
  }
  catch(error){
    res.status(400).send("server error")
  }
});


//DELETE
orderRouter.delete("/:id", JWTMiddleWare, async (req, res) => {
  try {
    await order.findByIdAndDelete(req.params.id);
    res.status(200).send("Order deleted successfully");
  } catch (err) {
    res.status(500).send(err);
  }
});


// get users order
orderRouter.get("/:userId", JWTMiddleWare, async (req, res) => {
  const {userId} = req?.params;
  console.log(userId , "suer")
  try {
    const getUsersOrder = await order.find({userId :userId});
    res.status(200).send(getUsersOrder);
  } catch (err) {
    res.status(500).send("server error");
  }
});

module.exports = orderRouter;