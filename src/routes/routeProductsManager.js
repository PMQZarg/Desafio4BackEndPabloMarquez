import express from "express";
import { productManager } from "../app.js";

const router = express.Router();

router.get("/products", async (req, res) => {
  const products = await productManager.getProducts();
  res.json(products);
});

router.get("/products/:id", async (req, res) => {
  const id = req.params.id;
  const product = await productManager.getProductById(id);
  res.json(product);
});

router.post("/products", async (req, res) => {
  const product = req.body;
  const newProduct = await productManager.createProduct(product);
  res.json(newProduct);
});

router.put("/products/:id", async (req, res) => {
  const id = req.params.id;
  const product = req.body;
  const updatedProduct = await productManager.updateProduct(id, product);
  res.json(updatedProduct);
});

router.delete("/products/:id", async (req, res) => {
  const id = req.params.id;
  const product = await productManager.deleteProduct(id);
  res.json(product);
});

export default router;
