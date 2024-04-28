const mongooose = require("mongoose");

const orderSchema = new mongooose.Schema(
  {
    userId : {
      type: mongooose.Schema.Types.ObjectId,
      ref: "user",
    },
    adress : {
      type: String ,
      required : true
    },
    status : {
      type: String ,
      enum: ['pending', 'fulfilled'],
      default: 'pending',
      required : true ,
    },
    products: [
      {
        productId: {
          type: mongooose.Schema.Types.ObjectId,
          ref: "product",
        },
        count: {
          type: Number,
        },
      },
    ],
  },
  {
    timeStamps: true,
  }
);

module.exports = mongooose.model("order", orderSchema);
