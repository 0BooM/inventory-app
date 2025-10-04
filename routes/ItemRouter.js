const { Router } = require("express");
const ItemRouter = Router();
const ItemController = require("../controllers/ItemController");

ItemRouter.get("/item/:id", ItemController.getItemDetails);

module.exports = ItemRouter;