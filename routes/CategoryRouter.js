const { Router } = require("express");
const CategoryRouter = Router();
const CategoryController = require("../controllers/CategoryController");

CategoryRouter.get("/", CategoryController.getCategories);
CategoryRouter.get("/category/:id", CategoryController.getCategoryWithItems);

module.exports = CategoryRouter;
