const { Router } = require("express");
const ItemRouter = Router();
const ItemController = require("../controllers/ItemController");

ItemRouter.get("/item/:id", ItemController.getItemDetails);
ItemRouter.get("/item/:id/edit", ItemController.getItemEditForm);
ItemRouter.post("/item/:id/edit", ItemController.postItemEditForm);

module.exports = ItemRouter;