const { Router } = require("express");
const ItemRouter = Router();
const ItemController = require("../controllers/ItemController");

//Show item details
ItemRouter.get("/item/:id", ItemController.getItemDetails);

//Edit item details
ItemRouter.get("/item/:id/edit", ItemController.getItemEditForm);
ItemRouter.post("/item/:id/edit", ItemController.postItemEditForm);

//Delete item
ItemRouter.get("/item/:id/delete", ItemController.getItemDeleteForm);
ItemRouter.post("/item/:id/delete", ItemController.postItemDeleteForm);

module.exports = ItemRouter;