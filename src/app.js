import express from "express";
import path from "path";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io"; // este Server se creará a partir del server HTTP
import { ProductManager } from "./manager/productManager.js";
import { CartManager } from "./manager/cartManager.js";
//import Index from "./router/indexRouter.js";
import productsRouter from "./router/productsRouter.js";
import cartsRouter from "./router/cartRouter.js";


const app = express();
const PORT = 8080;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); 

const pathProducts = "./src/data/products.json";
const pathCarts = "./src/data/carts.json";

export const productManager = new ProductManager(pathProducts);
export const cartManager = new CartManager(pathCarts);

app.use("/api", Index);
app.use("/api/products/", productsRouter);
app.use("/api/carts/", cartsRouter);

const httpServer = app.listen(PORT, () =>
  console.log(`Servidor corriendo en el puerto ${PORT}`)
); //solo el server HTTP
// Conexión con socket.io , tiene que coincidir el argumento que se pone entre parentesis httpServer , hay que hacer la constante,mandarlo por parámetro (), con eso mas el app.listen ... etc.
const socketServer = new Server(httpServer);
//configuracion que se usa para activar el handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public")); //sirve para tener archivos js y css en las plantillas
app.use("/", viewsRouter);

//esto es para que se me avise que hay un cliente conectado a mi servidor
socketServer.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  // aqui despues de socket.on (que quiere sirve para RECIBIR) se indica entre ("porEjMessage")el ID o nombre del mensaje que recibiré
  //se pone una coma, y luego se hace un callback con la data que me enviaron, mi visual pone las paréntesis, pero la filmina no lo indica
  socket.on("message", (data) => {
    console.log(data); // este console.log dice que va a mostrar(data), lo pone entre parentesis, luego el punto y coma
      socket.emit("message", data); // aqui se emite mnesaje desde mi servidor, pero como cliente, esto conectado a index.js (desde ahi)
  
}); 

})
