const pool = require("./pool");

async function getItem(id){
    const { rows } = await pool.query(
      `SELECT items.*, categories.name AS category_name
         FROM items
         JOIN categories ON items.category_id = categories.id
         WHERE items.id = $1`,
      [id]
    );
    return rows[0];
};

async function changeItemParams(name, quantity, id) {
  await pool.query("UPDATE items SET name = $1, quantity = $2 WHERE id = $3", [name, quantity, id]);
}

module.exports = {
    getItem,
    changeItemParams
}