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
  DeleteProduct,
  EditProduct,
  DeleteUser,
  DeletePoster
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
  const { user_id } = req.params;
  GetAllUser(user_id)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

route.get("/all-orders", (req, res) => {
  GetOrders()
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

route.post("/change-order-status", (req, res) => {
  const { order_id, status } = req.body;
  CancelOrder(order_id, status)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

route.delete("/delete-product", (req, res) => {
  const { product_id, user_id } = req.body;
  DeleteProduct(product_id, user_id)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

route.post('/edit-product',Upload.single("newimg"), (req,res) => {
  let filename =null
  const { name,price,category,description,product_id } = req.body;
  if(req.file){
    filename = req.file.filename;
  }
  EditProduct(name,price,category,description,filename,product_id)
  .then(response => res.json(response))
  .catch(err => res.json(err))
})

route.delete('/delete-user',(req,res) => {
  const { user_id } = req.body;
  DeleteUser(user_id)
  .then(response => res.json(response))
  .catch(err => res.json(err));
})

route.delete('/delete-poster', (req,res) => {
  const { poster_id } = req.body;
  DeletePoster(poster_id)
  .then(response => res.json(response))
  .catch(err => console.log(err))
})

module.exports = route;
