const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      unique : true ,
      required :true
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required :true
        },
        count: {
          type: Number,
          required :true,
        },
      },
    ],
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("cart", cartSchema);
