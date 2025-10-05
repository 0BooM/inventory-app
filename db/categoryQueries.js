const { name } = require("ejs");
const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories ORDER BY id");
  return rows;
}

async function getCategoryById(id){
    const { rows } = await pool.query("SELECT * FROM categories WHERE id=($1)", [id])
    return rows[0];
}

async function getCategoryItems(id){
    const { rows } = await pool.query("SELECT * FROM items WHERE category_id = ($1) ORDER BY id", [id]);
    return rows;
}

async function changeCategoryParams(name, id){
    await pool.query("UPDATE categories SET name = $1 WHERE id = $2", [name, id]);
}
async function deleteCategory(id) {
    await pool.query("DELETE FROM categories WHERE id = $1", [id]);
}

module.exports = {
  getAllCategories,
  getCategoryById,
  getCategoryItems,
  changeCategoryParams,
  deleteCategory
};
