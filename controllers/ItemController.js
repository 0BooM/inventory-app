const db = require("../db/itemQueries");
const categoryDb = require("../db/categoryQueries");

async function getItemDetails(req, res) {
  const id = req.params.id;
  try {
    const item = await db.getItem(id);
    if (!item) {
      res.status(404).send("Item not found!");
    }
    res.render("item/itemDescription", { item });
  } catch (err) {
    res.status(500).send("Error fetching item");
  }
}

async function getItemEditForm(req, res) {
  const id = req.params.id;
  try {
    const item = await db.getItem(id);
    const categories = await categoryDb.getAllCategories();
    res.render("item/itemEditForm", { item, categories });
  } catch (err) {
    res.status(500).send("Error fetching item");
  }
}

async function postItemEditForm(req, res) {
  const id = req.params.id;
  try {
    const name = req.body.title;
    const quantity = req.body.quantity;
    await db.changeItemParams(name, quantity, id);

    const item = await db.getItem(id);
    res.redirect(`/category/${item.category_id}`);
  } catch (err) {
    res.status(500).send("Error fetching item");
  }
}

async function getItemDeleteForm(req, res) {
  const id = req.params.id;
  try {
    const item = await db.getItem(id);
    const categories = await categoryDb.getAllCategories();
    res.render("item/itemDeleteForm", { item, categories });
  } catch (err) {
    res.status(500).send("Error fetching item");
  }
}

async function postItemDeleteForm(req, res) {
    const id = req.params.id;
    try{
        const item = await db.getItem(id);
        await db.deleteItem(id);
        res.redirect(`/category/${item.category_id}`);
    } catch (error){
        res.status(500).send("Error fetching category edit form");
    }
}

async function getItemCreateForm(req, res) {
  try{
    const categories = await categoryDb.getAllCategories();
    res.render("item/itemCreateForm", {categories});
  }
  catch (err){
    res.status(500).send("Error fetching item create form");
  }
}

async function postItemCreateForm(req, res) {
  const { title, quantity, category } = req.body;
  try{
    await db.createItem(title, quantity, category);
    res.redirect("/");
  } catch (err){
    res.status(500).send("Error fetching item create form");
  }
}

module.exports = {
  getItemDetails,
  getItemEditForm,
  postItemEditForm,
  getItemDeleteForm,
  postItemDeleteForm,
  getItemCreateForm,
  postItemCreateForm
};
