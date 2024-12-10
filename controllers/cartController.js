const Cart = require("../models/cartModel");
let cartData = [
  {
    userId: 1,
    items: [
      {
        productId: 101,
        productName: "Smart Cane For The Blinds",
        productPrice: 1200,
        quantity: 2,
        subtotal: 2400,
      },
    ],
  },
];
const calculateSubtotal = (price, quantity) => price * quantity;

const addToCart = async (req, res) => {
  const { userId, productId, productName, productPrice, quantity } = req.body;
  try {
    let cart = await cartData.find((cart) => cart.userId == userId);
    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId == productId
      );
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
        cart.items[existingItemIndex].subtotal = calculateSubtotal(
          cart.items[existingItemIndex].productPrice,
          cart.items[existingItemIndex].quantity
        );
      } else {
        cart.items.push({
          productId,
          productName,
          productPrice,
          quantity,
          subtotal: calculateSubtotal(productPrice, quantity),
        });
      }
    } else {
      cartData.push({
        userId,
        items: [
          {
            productId,
            productName,
            productPrice,
            quantity,
            subtotal: calculateSubtotal(productPrice, quantity),
          },
        ],
      });
    }
    res.status(200).json({ message: "Cart Updated successfully", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error Updating cart", error });
  }
};

const getCart = (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  try {
    const cart = cartData.find((cart) => cart.userId == userId);
    console.log(cart);
    if (!cart) {
      return res.status(404).json({ message: "no items in cart" });
    } else {
      const total = cart.items.reduce((acc, item) => acc + item.subtotal, 0);
      return res.status(200).json({ cart, total });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error fetching cart", error });
  }
};

const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const cart = await cartData.find((cart) => cart.userId == userId);
    if (cart) {
      cart.items = cart.items.filter((item) => item.productId != productId);
      res.status(200).json({ message: "item removed successfully", cart });
    } else {
      res.status(404).json({ message: "no items in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: "error removing item", error });
  }
};
const updateQuantity = (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || quantity == null) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const cart = cartData.find((cart) => cart.userId == userId);
  if (!cart) {
    return res.status(404).json({ error: "Cart not found" });
  }

  const product = cart.items.find((item) => item.productId == productId);
  if (!product) {
    return res.status(404).json({ error: "Product not found in cart" });
  }

  product.quantity = quantity;
  product.subtotal = product.productPrice * quantity;

  return res.json({ message: "Quantity updated successfully", cart });
};

module.exports = { addToCart, removeFromCart, getCart, updateQuantity };
