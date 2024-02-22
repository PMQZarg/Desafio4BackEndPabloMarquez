import { Router } from "express";

const router = Router();

router.get("/products", () => {
  console.log("comprobación de producto obtenido");
});

router.post("/cart", () => {
  console.log("comprobación de tarjeta agregada");
});

router.put("/products", () => {
  console.log("comprobación producto actualizado");
});

router.delete("/products", () => {
  console.log("comprobación de producto borrado");
});

export default router;
