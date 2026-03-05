const express = require("express");
const app = express();

const userRoutes = require("./user");
const productRoutes = require("./product");

app.use("/users", userRoutes);
app.use("/products", productRoutes);

app.listen(3000, () => console.log("Server running"));