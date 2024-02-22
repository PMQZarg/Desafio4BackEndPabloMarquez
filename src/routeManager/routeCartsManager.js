import express from "express";
import { cartManager } from "../app.js";

const router = express.Router();

router.get("/cart", async (req, res) => {
  const cart = await cartManager.getCart();
  res.json(cart);
});

router.post("/cart", async (req, res) => {
  const product = req.body;
  const cart = await cartManager.addToCart(product);
  res.json(cart);
});

router.put("/cart/:id", async (req, res) => {
  const id = req.params.id;
  const product = req.body;
  const cart = await cartManager.updateCartItem(id, product);
  res.json(cart);
});

router.delete("/cart/:id", async (req, res) => {
  const id = req.params.id;
  const cart = await cartManager.deleteCartItem(id);
  res.json(cart);
});

export default router;
