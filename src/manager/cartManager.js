import fs from "fs";
import {productManager} from "../app.js";

export class CartManager {
  constructor() {
    this.path = "./src/data/carts.json";
  }

  getCarts() {
    try {
      const data = fs.readFileSync(this.path, "utf8");
      this.carts = JSON.parse(data);
      return this.carts;
    } catch (error) {
      console.error("Error al leer el archivo", error);
      return [];
    }
  }

  getCartById(cartId) {
    this.getCarts();
    const cart = this.carts.find((c) => c.id === cartId);
    if (cart === undefined) {
      console.log(`El carrito con el id ${cartId} no existe`);
    } else return cart;
  }

  addProduct(cartId, productId) {
    try {
      this.getCarts();
      const cart = this.carts.find((cart) => cart.id === cartId);
      if (!cart) {
        throw new Error(`No se encontró el carrito con id ${cartId}`);
      }
      const existingProduct = cart.products.find(
        (product) => product.id === parseInt(productId)
      );
      if (!existingProduct) {
        const product = productManager.getProductById(productId);
        if (!product) {
          throw new Error(`No se encontró el producto con id ${productId}`);
        }
        cart.products.push({
          id: parseInt(productId),
          quantity: 1,
        });
      } else {
        existingProduct.quantity++;
      }
      fs.writeFileSync(this.path, JSON.stringify(this.carts));
      return cart;
    } catch (error) {
      console.error("Error al agregar producto al carrito", error);
      throw error;
    }
  }

  deleteProduct(cartId, productId) {
    this.getCarts();
    const cart = this.carts.find((cart) => cart.id === cartId);
    if (!cart) {
      throw new Error(`No se encontró el carrito con id ${cartId}`);
    }
    const product = cart.products.find((product) => product.id === productId);
    if (!product) {
      throw new Error(
        `No se encontró el producto con id ${productId} en el carrito con id ${cartId}`
      );
    }
    if (product.quantity > 1) {
      product.quantity--;
    } else {
      cart.products.splice(cart.products.indexOf(product), 1);
    }
    fs.writeFileSync(this.path, JSON.stringify(this.carts));
    console.log("El producto ha sido borrado");
  }
}
