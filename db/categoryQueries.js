const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function getCategoryById(id){
    const { rows } = await pool.query("SELECT * FROM categories WHERE id=($1)", [id])
    return rows[0];
}

async function getCategoryItems(id){
    const { rows } = await pool.query("SELECT * FROM items WHERE category_id = ($1)", [id]);
    return rows;
}
module.exports = {
  getAllCategories,
  getCategoryById,
  getCategoryItems
};
