const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    cart: {type: mongoose.Schema.Types.ObjectId, ref: "cart" ,required: false},
    order: {type: mongoose.Schema.Types.ObjectId, ref: "order" , required: false} ,
    isAdmin: {type: String, required: false, default: false},
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("user", userSchema);

module.exports = user;
