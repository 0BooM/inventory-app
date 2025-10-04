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


module.exports = {
    getItem,
}