import fs from "fs";

export class ProductManager {
  constructor() {
    this.products = [];
    this.path = "./src/data/products.json";
  }

  getProducts() {
    try {
      const data = fs.readFileSync(this.path, "utf8");
      this.products = JSON.parse(data);
      return this.products;
    } catch (error) {
      console.error("No se pudo leer el archivo", error);
      return [];
    }
  }

  getProductById(pid) {
    this.getProducts();
    const productId = this.products.find((product) => product.id === pid);

    if (productId) {
      return productId;
    } else {
      console.error(`No se encontro el producto de ID: ${productId}`);
    }
  }

  addProduct(product) {
    const {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category,
      status,
      quantity,
      
    } = product;

    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock ||
      !product.category ||
      !product.status ||
      !product.quantity
    ) {
      throw new Error("Todos los campos son obligatorios.");
    }

    if (this.products.some((prod) => prod.code === code)) {
      throw new Error("El producto ya existe");
    }

    const newProduct = {
      id: this.products.length + 1,
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
      category: category,
      status: status,
      quantity: 1
    };

    this.products.push(newProduct);
    console.log("El producto fue agregado con exito");

    try {
      fs.writeFileSync(this.path, JSON.stringify(this.products));
      console.log("Producto guaradado");
      return newProduct;
    } catch (error) {
      console.error("No se pudo guardar el producto", error);
      throw error;
    }
  }

  deleteProduct(id) {
    this.getProducts();
    const productId = this.products.find((product) => product.id === id);
    if (productId) {
      const Index = this.products.findIndex((product) => product.id === id);
      this.products.splice(Index, 1);
      try {
        fs.writeFileSync(this.path, JSON.stringify(this.products));
        console.log("Producto eliminado");
      } catch (error) {
        console.error("No se pudo eliminar el producto", error);
      }
    } else {
      console.log("No se encontro el producto");
    }
  }

  updateProduct(id, productUpdate) {
    this.getProducts();
    const productId = this.products.find((product) => product.id === id);
    if (productId) {
      const Index = this.products.findIndex((product) => product.id === id);
      this.products[Index] = { id, ...productUpdate };
      try {
        fs.writeFileSync(this.path, JSON.stringify(this.products));
        console.log("Se actualizo el archivo");
      } catch (error) {
        console.error("No se pudo actualizar", error);
      }
    } else {
      console.log("No se encontro el producto");
    }
  }
}
