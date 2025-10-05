const db = require("../db/categoryQueries");

async function getCategories(req, res) {
    const categories = await db.getAllCategories();
    res.render("home", {categories});
}

async function getCategoryWithItems(req, res) {
    const id = req.params.id;
    try{
        const category = await db.getCategoryById(id);
        const items = await db.getCategoryItems(id);
        if(!category){
            return res.status(404).send("Category not found");
        }
        res.render("category/category", {category, items});
    } catch(err){
        res.status(500).send("Error fetching category or items");
    }
}

async function getCategoryEditForm(req, res) {
    const id = req.params.id;
    try{
        const category = await db.getCategoryById(id);
        if(!category){
            res.status(404).send("Category not found");
        }
        res.render("category/categoryEditForm", {category});
    } catch (err){
        res.status(500).send("Error fetching category edit form");
    }
}

async function postCategoryEditForm(req, res){
    const id = req.params.id;
    try {
        const title = req.body.title;
        await db.changeCategoryParams(title, id);
        res.redirect("/");
    } catch (err) {
        res.status(500).send("Error fetching category edit form");
    }
}

async function getCategoryDeleteForm(req, res) {
    const id = req.params.id;
    try {
      const category = await db.getCategoryById(id);
      if (!category) {
        res.status(404).send("Category not found");
      }
      res.render("category/categoryDeleteForm", { category });
    } catch (err) {
      res.status(500).send("Error fetching category edit form");
    }
}

async function postCategoryDeleteForm(req, res) {
    const id = req.params.id;
    try{
        await db.deleteCategory(id);
        res.redirect("/");
    } catch (error){
        res.status(500).send("Error fetching category edit form");
    }
}

module.exports = {
    getCategories,
    getCategoryWithItems,
    getCategoryEditForm,
    postCategoryEditForm,
    getCategoryDeleteForm,
    postCategoryDeleteForm
}