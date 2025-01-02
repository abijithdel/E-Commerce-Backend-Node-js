const express = require("express");
const route = express.Router();
const {
    OneProduct,
    AddtoCart,
    CartItemCount,
    CartItems,
    SaveAddress,
    GetAddress,
    OrderCashon,
    GetOrders,
} = require("../helpers/index");
const countries = require("../config/countries");

route.get("/product/:id", (req, res) => {
    const { id } = req.params;
    OneProduct(id)
        .then((response) => res.json(response))
        .catch((err) => res.json(err));
});

route.post("/add-to-cart", (req, res) => {
    const { user_id, products_id } = req.body;
    AddtoCart(products_id, user_id)
        .then((response) => res.json(response))
        .catch((err) => res.json(err));
});

route.get("/cart-item-count/:user_id", (req, res) => {
    const { user_id } = req.params;
    CartItemCount(user_id)
        .then((response) => res.json(response))
        .catch((err) => res.json(err));
});

route.get("/cart-items/:user_id", (req, res) => {
    const { user_id } = req.params;
    CartItems(user_id)
        .then((response) => res.json(response))
        .catch((err) => res.json(err));
});

route.get("/all-countries", (req, res) => {
    res.json(countries);
});

route.post("/save-address", (req, res) => {
    const { user_id, countriename, name, phone, pincode, address, state } =
        req.body;
    SaveAddress(user_id, countriename, name, phone, pincode, address, state)
        .then((response) => res.json(response))
        .catch((err) => res.json(err));
});

route.get("/get-address/:user_id", (req, res) => {
    const { user_id } = req.params;
    GetAddress(user_id)
        .then((response) => res.json(response))
        .catch((err) => res.json(err));
});

route.post("/order-cashon", (req, res) => {
    const { user_id, price, quantity, product, address, paymethods } = req.body;
    OrderCashon(user_id, price, quantity, product, address, paymethods)
        .then((response) => res.json(response))
        .catch((err) => res.json(err));
});

route.get("/orders/:user_id", (req, res) => {
    const { user_id } = req.params;
    GetOrders(user_id)
    .then(response => res.json(response))
    .catch(err => res.json(err))
});

module.exports = route;
