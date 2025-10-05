const { Router } = require("express");
const CategoryRouter = Router();
const CategoryController = require("../controllers/CategoryController");

//Homepage (display all categories)
CategoryRouter.get("/", CategoryController.getCategories);

//Display category with items that belong to it
CategoryRouter.get("/category/:id", CategoryController.getCategoryWithItems);

//Edit category params
CategoryRouter.get("/category/:id/edit", CategoryController.getCategoryEditForm);
CategoryRouter.post("/category/:id/edit", CategoryController.postCategoryEditForm)

//Delete category
CategoryRouter.get("/category/:id/delete", CategoryController.getCategoryDeleteForm);
CategoryRouter.post("/category/:id/delete", CategoryController.postCategoryDeleteForm);

module.exports = CategoryRouter;
