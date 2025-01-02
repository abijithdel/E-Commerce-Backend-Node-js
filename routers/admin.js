const express = require("express");
const route = express.Router();
const {
  isAdmin,
  UploadProduct,
  CreatePoster,
  GetAllPosters,
  GetAllProducts,
  GetSpecial,
  GetAllUser,
  GetOrders,
  CancelOrder,
} = require("../helpers/admin");
const Upload = require("../config/multer");

route.post("/isadmin", (req, res) => {
  const { id } = req.body;
  isAdmin(id)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

route.post("/upload-product", Upload.single("img"), (req, res) => {
  const { name, price, category, description } = req.body;
  const filename = req.file.filename;
  UploadProduct(name, price, category, description, filename)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

route.post("/createposter", Upload.single("posterimg"), (req, res) => {
  const { title } = req.body;
  const filename = req.file.filename;
  CreatePoster(title, filename)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

route.get("/allposters", (req, res) => {
  GetAllPosters()
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

route.get("/get-all-products", (req, res) => {
  GetAllProducts()
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

route.get("/special", (req, res) => {
  GetSpecial()
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

route.get("/all-users/:user_id", (req, res) => {
    const { user_id } = req.params
  GetAllUser(user_id)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

route.get('/all-orders', (req,res) => {
  GetOrders()
  .then(response => res.json(response))
  .catch(err => res.json(err));
})

route.get('/cancel-order/:order_id', (req,res) => {
  const { order_id } = req.params
  CancelOrder(order_id)
  .then(response => res.json(response))
  .catch(err => res.json(err));
})

module.exports = route;
