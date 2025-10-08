const db = require("../db/itemQueries");
const categoryDb = require("../db/categoryQueries");
const checkPassword = require("../utils/checkPassword");
const { body, validationResult, matchedData } = require("express-validator");

const validateItem = [
  body("title")
    .trim()
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Title must contain only letters and spaces.")
    .notEmpty()
    .withMessage("Title cannot be empty"),
  body("quantity")
    .isInt({ min: 1, max: 999 })
    .withMessage("Quantity must be a number between 1 and 999"),
  body("category").notEmpty().withMessage("Category is required"),
  body("password").notEmpty().withMessage("Password is required."),
];

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
    res.render("item/itemEditForm", {
      item,
      categories,
      oldInput: null,
      errors: [],
    });
  } catch (err) {
    res.status(500).send("Error fetching item");
  }
}

async function postItemEditForm(req, res) {
  const id = req.params.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const item = await db.getItem(id);
    const categories = await categoryDb.getAllCategories();
    return res.status(400).render("item/itemEditForm", {
      item,
      categories,
      errors: errors.array(),
      oldInput: req.body,
    });
  }

  const title = req.body.title;
  const quantity = req.body.quantity;
  const category = req.body.category;
  const password = req.body.password;

  if (!checkPassword(password)) {
    const item = await db.getItem(id);
    const categories = await categoryDb.getAllCategories();
    const passwordError = { msg: "Invalid password" };
    return res.status(400).render("item/itemEditForm", {
      item,
      categories,
      errors: [passwordError],
      oldInput: req.body,
    });
  }
  try {
    await db.changeItemParams(title, quantity, category, id);
    const item = await db.getItem(id);
    res.redirect(`/category/${item.category_id}`);
  } catch (err) {
    res.status(500).send("Error updating item");
  }
}

async function getItemDeleteForm(req, res) {
  const id = req.params.id;
  try {
    const item = await db.getItem(id);
    const categories = await categoryDb.getAllCategories();
    res.render("item/itemDeleteForm", {
      item,
      categories,
      oldInput: null,
      errors: [],
    });
  } catch (err) {
    res.status(500).send("Error fetching item");
  }
}

async function postItemDeleteForm(req, res) {
  const id = req.params.id;
  const password = req.body.password;
  if (!checkPassword(password)) {
    const item = await db.getItem(id);
    const categories = await categoryDb.getAllCategories();
    const passwordError = { msg: "Invalid password" };
    return res.status(400).render("item/itemDeleteForm", {
      item,
      categories,
      errors: [passwordError],
      oldInput: req.body,
    });
  }
  try {
    const item = await db.getItem(id);
    await db.deleteItem(id);
    res.redirect(`/category/${item.category_id}`);
  } catch (error) {
    res.status(500).send("Error deleting item");
  }
}

async function getItemCreateForm(req, res) {
  try {
    const categories = await categoryDb.getAllCategories();
    const selectedCategoryId = req.query.category
      ? Number(req.query.category)
      : null;
    res.render("item/itemCreateForm", {
      categories,
      selectedCategoryId,
      oldInput: null,
      errors: [],
    });
  } catch (err) {
    res.status(500).send("Error fetching item create form");
  }
}

async function postItemCreateForm(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const categories = await categoryDb.getAllCategories();
    const selectedCategoryId = req.body.category;
    return res.status(400).render("item/itemCreateForm", {
      categories,
      selectedCategoryId,
      errors: errors.array(),
      oldInput: req.body,
    });
  }

  const title = req.body.title;
  const quantity = req.body.quantity;
  const category = req.body.category;
  const password = req.body.password;

  if (!checkPassword(password)) {
    const categories = await categoryDb.getAllCategories();
    const selectedCategoryId = req.body.category;
    const passwordError = { msg: "Invalid password" };
    return res.status(400).render("item/itemCreateForm", {
      categories,
      selectedCategoryId,
      errors: [passwordError],
      oldInput: req.body,
    });
  }
  try {
    await db.createItem(title, quantity, category);
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Error creating item");
  }
}

module.exports = {
  getItemDetails,
  getItemEditForm,
  postItemEditForm,
  getItemDeleteForm,
  postItemDeleteForm,
  getItemCreateForm,
  postItemCreateForm,
  validateItem,
};
