const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const Cart = require("./models/cartModel");
const cartRoutes = require("./routes/cartRoutes");
const cors = require("cors");
const app = express();

const port = 3000;
app.use(bodyParser.json());
app.use(cors());
app.use("/cart", cartRoutes);

app.listen(port, () => {
  console.log("server runing on port 3000");
});
