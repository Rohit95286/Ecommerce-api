const isUserAdmin = require("../middleWare/isUserAdminMiddleWare");
const JWTMiddleWare = require("../middleWare/jwtMiddleWare");
const product = require("../models/product");

const productRouter = require("express").Router();

// create a product => verify if jwt is verifired , if user is admin // middlewares

productRouter.post('/' ,[JWTMiddleWare , isUserAdmin]  ,async (req , res)=>{
    const {name , price , description , quantity} = req?.body;
    try{
        const productData = new product({name , description , price , quantity});
        const saveProduct = await productData.save()
        res.status(200).send(saveProduct);
    }
    catch(error){
        res.status(500).send("something went wrong")
    }
})


//--------------------------------------------------------------------------------
// get all product => pagination (offset and limits)
// sort only if required 
// search with searchTerm and price filter.


productRouter.get("/all" , async(req,res)=>{
    const {sortBy , sortorder} = req?.query;
    const {searchTerm ,  minprice , maxprice , offset , limit} = req?.body;

    //========================== chatgpt prompts used =================================================
    const query = {}

    if (searchTerm) {
        query.name = new RegExp(searchTerm, 'i'); 
        
      }
      if (minprice !== undefined && maxprice !== undefined) {
        query.price = { $gte: minprice, $lte: maxprice }; 
      }

      const sortOptions = {};
      if (sortBy && sortBy=="price"  && sortorder && sortorder == "asc") {
          sortOptions.price = 1 ;
        }

     if (sortBy && sortBy=="price"  &&  sortorder  && sortorder == "desc") {
            sortOptions.price = -1 ;
        }


        const finalOffset = offset || 0;
        const finalLimit = limit || 1;



        try{
            const data = await product
            .find(query)
            .sort(sortOptions)
            .limit(finalLimit)
            .skip(finalOffset)

            res.status(200).send(data);

        }
        catch(error){res.status(500).send("server error")}
})
   



// get a product with id

productRouter.get('/:id' , async(req, res)=>{
    const {id} = (req?.params);
    try{
        const productData = await product.find({_id : id}).select("name price description quantity");
        console.log(productData)
        res.status(200).send(productData);
    }
    catch(error){
        res.status(400).send("something went wrong")
    }
});


// delete [JWT AND ADMIN ROLE ONLY]

productRouter.delete('/:id' , [JWTMiddleWare , isUserAdmin] ,async(req, res)=>{
    console.log("here")
    const {id} = (req?.params);
    try{
        const productData = await product.findByIdAndDelete(id)
        res.status(200).send(productData);
    }
    catch(error){
        res.status(400).send("something went wrong")
    }
});

// update product


productRouter.put('/:id/:userId' , [JWTMiddleWare , isUserAdmin] ,async(req, res)=>{
    console.log("here")
    const {id} = (req?.params);
    const body = req?.body;
    try{
        const productData = await product.findById(id)
        console.log(productData , "productData");
        Object.assign(productData, body);
        const saveProduct = await productData.save();
        res.status(200).send(saveProduct);
    }
    catch(error){
        res.status(400).send(error)
    }
});












module.exports= productRouter;