"use strict";

import verifyUser from "../middlewares/verifyAccessToken";
import checkFreeAgents from "../middlewares/checkFreeAgents";
import getUserKeyId from "../middlewares/getUserKeyId";
import controller from "../controller/controller";

export default (app, db) => {

    //GET
    app.get("/roles", verifyUser, controller.readData(db, "roles"));
    app.get("/permissions", verifyUser, controller.readData(db, "permissions"));
    app.get("/users", verifyUser, controller.readData(db, "users"));
    app.get("/clocks", verifyUser, controller.readData(db, "clocks"));
    app.get("/cities", verifyUser, controller.readData(db, "cities"));
    app.get("/marks", verifyUser, controller.readData(db, "marks"));
    app.get("/agents", verifyUser, controller.readData(db, "agents"));
    app.get("/freeagents", verifyUser, checkFreeAgents(db), controller.readData(db, "agents"));
    app.get("/coverage", verifyUser, controller.readData(db, "coverage"));
    app.get("/orders", verifyUser, controller.readData(db, "orders"));
    app.get("/role/:id", verifyUser, controller.readData(db, "roles"));
    app.get("/permission/:id", verifyUser, controller.readData(db, "permissions"));
    app.get("/user/:id", verifyUser, controller.readData(db, "users"));
    app.get("/clock/:id", verifyUser, controller.readData(db, "clocks"));
    app.get("/city/:id", verifyUser, controller.readData(db, "cities"));
    app.get("/mark/:id", verifyUser, controller.readData(db, "marks"));
    app.get("/agent/:id", verifyUser, controller.readData(db, "agents"));
    app.get("/coverage/:id", verifyUser, controller.readData(db, "coverage"));
    app.get("/order/:id", verifyUser, controller.readData(db, "orders"));
    app.get("/refresh", controller.refreshTokens(db));

    //POST
    app.post("/role", verifyUser, controller.createData(db, "roles"));
    app.post("/permission", verifyUser, controller.createData(db, "permissions"));
    app.post("/signup", verifyUser, controller.createData(db, "users"));
    app.post("/login", controller.loginUser(db));
    app.post("/clock", verifyUser, controller.createData(db, "clocks"));
    app.post("/city", verifyUser, controller.createData(db, "cities"));
    app.post("/mark", verifyUser, controller.createData(db, "marks"));
    app.post("/agent", verifyUser, controller.createData(db, "agents"));
    app.post("/coverage", verifyUser, controller.createData(db, "coverage"));
    app.post("/order", verifyUser, controller.createData(db, "orders"));
    
    //PATCH
    app.patch("/role/:id", verifyUser, controller.updateData(db, "roles"));
    app.patch("/permission/:id", verifyUser, controller.updateData(db, "permissions"));
    app.patch("/user/:id", verifyUser, controller.updateData(db, "users"));
    app.patch("/clock/:id", verifyUser, controller.updateData(db, "clocks"));
    app.patch("/city/:id", verifyUser, controller.updateData(db, "cities"));
    app.patch("/mark/:id", verifyUser, controller.updateData(db, "marks"));
    app.patch("/agent/:id", verifyUser, controller.updateData(db, "agents"));
    app.patch("/coverage/:id", verifyUser, controller.updateData(db, "coverage"));
    app.patch("/order/:id", verifyUser, controller.updateData(db, "orders"));

    //DELETE
    app.delete("/role/:id", verifyUser, controller.deleteData(db, "roles"));
    app.delete("/permission/:id", verifyUser, controller.deleteData(db, "permissions"));
    app.delete("/user/:id", verifyUser, controller.deleteData(db, "users"));
    app.delete("/logout", verifyUser, getUserKeyId(db), controller.deleteData(db, "keys"));
    app.delete("/clock/:id", verifyUser, controller.deleteData(db, "clocks"));
    app.delete("/city/:id", verifyUser, controller.deleteData(db, "cities"));
    app.delete("/mark/:id", verifyUser, controller.deleteData(db, "marks"));
    app.delete("/agent/:id", verifyUser, controller.deleteData(db, "agents"));
    app.delete("/coverage/:id", verifyUser, controller.deleteData(db, "coverage"));
    app.delete("/order/:id", verifyUser, controller.deleteData(db, "orders"));

};