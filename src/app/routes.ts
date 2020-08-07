import { Router } from "express";
import userController from "./Controller/userController";
import groupController from "./Controller/groupController";
import permissionController from "./Controller/permissionController";

const routes = Router();

routes.post("/auth", userController.auth);

routes.get("/users", userController.show);
routes.get("/user/:id", userController.index);
routes.post("/user", userController.store);
routes.put("/user/:id", userController.update);
routes.delete("/user/:id", userController.delete);

routes.get("/groups", groupController.show);
routes.get("/group/:id", groupController.index);
routes.post("/group", groupController.store);
routes.put("/group/:id", groupController.update);
routes.delete("/group/:id", groupController.delete);

routes.get("/permissions", permissionController.show);
routes.get("/permission/:id", permissionController.index);
routes.post("/permission", permissionController.store);
routes.put("/permission/:id", permissionController.update);
routes.delete("/permission/:id", permissionController.delete);

export default routes;
