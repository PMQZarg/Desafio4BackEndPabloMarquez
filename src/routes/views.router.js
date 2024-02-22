import express from "express";
import { ProductManager } from "../manager/productManager.js";
//creando un router
const router = express.Router();

const p = new ProductManager();

router.get("/", (req, res) => {
  const products = p.getProducts();
  res.render("home", { products }); //por ahora solo se renderiza la vista, sin pasar objeto {}, despues ... vemos.
});

export default router;
