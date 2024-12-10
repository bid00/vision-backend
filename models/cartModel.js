const mongose = require("mongoose");

const cartShcema = new mongose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
});

const Cart = mongose.model("Cart", cartShcema);

module.exports = Cart;
