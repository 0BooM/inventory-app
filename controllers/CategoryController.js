const db = require("../db/categoryQueries");
require("dotenv").config();
const checkPassword = require("../utils/checkPassword");
const { body, validationResult, matchedData } = require("express-validator");

const validateCategory = [
  body("title")
    .trim()
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Title must contain only letters and spaces.")
    .notEmpty()
    .withMessage("Title cannot be empty"),
  body("password").notEmpty().withMessage("Password is required."),
];

async function getCategories(req, res) {
  const categories = await db.getAllCategories();
  res.render("home", { categories });
}

async function getCategoryWithItems(req, res) {
  const id = req.params.id;
  try {
    const category = await db.getCategoryById(id);
    const items = await db.getCategoryItems(id);
    if (!category) {
      return res.status(404).send("Category not found");
    }
    res.render("category/category", { category, items });
  } catch (err) {
    res.status(500).send("Error fetching category or items");
  }
}

async function getCategoryEditForm(req, res) {
  const id = req.params.id;
  try {
    const category = await db.getCategoryById(id);
    if (!category) {
      res.status(404).send("Category not found");
    }
    res.render("category/categoryEditForm", { category });
  } catch (err) {
    res.status(500).send("Error fetching category edit form");
  }
}

async function postCategoryEditForm(req, res) {
  const id = req.params.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const category = await db.getCategoryById(id);
    return res.status(400).render("category/categoryEditForm", {
      category,
      errors: errors.array(),
      oldInput: req.body,
    });
  }
  const { title } = matchedData(req);
  const password = req.body.password;
  if (!checkPassword(password)) {
    const category = await db.getCategoryById(id);
    const passwordError = { msg: "Invalid password" };
    return res.status(400).render("category/categoryEditForm", {
      category,
      errors: [passwordError],
      oldInput: req.body,
    });
  }
  try {
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const category = await db.getCategoryById(id);
    return res.status(400).render("category/categoryDeleteForm", {
      category,
      errors: errors.array(),
      oldInput: req.body,
    });
  }
  const password = req.body.password; // Always available
  if (!checkPassword(password)) {
    const category = await db.getCategoryById(id);
    const passwordError = { msg: "Invalid password" };
    return res.status(400).render("category/categoryDeleteForm", {
      category,
      errors: [passwordError],
      oldInput: req.body,
    });
  }
  try {
    await db.deleteCategory(id);
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error fetching category edit form");
  }
}

async function getCategoryCreateForm(req, res) {
  res.render("category/categoryCreateForm", {
    oldInput: null,
    errors: [],
  });
}

async function postCategoryCreateForm(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("category/categoryCreateForm", {
      errors: errors.array(),
      oldInput: req.body,
    });
  }
  const title = req.body.title;
  const password = req.body.password;
  if (!checkPassword(password)) {
    const passwordError = { msg: "Invalid password" };
    return res.status(400).render("category/categoryCreateForm", {
      errors: [passwordError],
      oldInput: req.body,
    });
  }
  try {
    await db.createCategory(title);
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Error fetching category create form");
  }
}

module.exports = {
  getCategories,
  getCategoryWithItems,
  getCategoryEditForm,
  postCategoryEditForm,
  getCategoryDeleteForm,
  postCategoryDeleteForm,
  getCategoryCreateForm,
  postCategoryCreateForm,
};
