import express from "express";
import ProductRouter from "./router/product.routes.js";
import CartRouter from "./router/carts.routes.js";
import { __dirname } from "./path.js";
import { engine } from "express-handlebars";
import * as path from "path";
import { Server } from "socket.io";
import viewsRouter from "./router/views.routes.js";
import ProductManager from "./controllers/ProductManager.js";

const app = express();
const PORT = 4000;
const Servidor = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
const io = new Server(Servidor);
const Manager = new ProductManager();

//midd
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use("/", viewsRouter);

app.use("/api/products", ProductRouter);
app.use("/api/cart", CartRouter);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname + "/views"));

io.on("connection", (socket) => {
  console.log("Nueva conexión establecida.");

  io.sockets.emit("products", Manager.getProducts());

  socket.on("AddProduct", (obj) => {
    Manager.AddProduct(obj);
    io.sockets.emit("products", Manager.getProducts());
  });

  socket.on("DeleteProduct", (obj) => {
    Manager.DeleteProduct(obj.pid);
    io.sockets.emit("products", Manager.getProducts());
  });
});
