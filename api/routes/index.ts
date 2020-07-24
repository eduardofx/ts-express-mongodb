import { Express } from "express";

import ordersRoutes from "./orders";
import productsRoutes from "./products";
import usersRoutes from "./users";

const router = (app: Express) => {
  app.use("/orders", ordersRoutes);
  app.use("/products", productsRoutes);
  app.use("/users", usersRoutes);
};

export default router;
