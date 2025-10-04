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
        res.render("category", {category, items});
    } catch(err){
        res.status(500).send("Error fetching category or items");
    }
}

module.exports = {
    getCategories,
    getCategoryWithItems
}