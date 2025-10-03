const { Client } = require("pg");
require("dotenv").config();

const CATEGORIES_TABLE = `CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50)
);`;
const ITEMS_TABLE = `CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(70),
    quantity INTEGER,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
);
`;

const INSERT_CATEGORIES = `INSERT INTO categories (name) VALUES
    ('pizza'),
    ('pasta'),
    ('dessert');`;

const INSERT_ITEMS = `INSERT INTO items (name, quantity, category_id) VALUES
      ('Margherita', 10, 1),
      ('Pepperoni', 8, 1),
      ('Hawaiian', 5, 1),
      ('Carbonara', 7, 2),
      ('Bolognese', 6, 2),
      ('Tiramisu', 4, 3);`;

async function main() {
  console.log("sending");
  const client = new Client({
    connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  });
  try {
    await client.connect();
    await client.query(CATEGORIES_TABLE);
    await client.query(ITEMS_TABLE);
    await client.query(INSERT_CATEGORIES);
    await client.query(INSERT_ITEMS);
    console.log("done");
  } catch (err) {
    console.log("Error:", err);
  } finally {
    await client.end();
  }
}

main();
