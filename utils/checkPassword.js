require("dotenv").config();

function checkPassword(input) {
  return input === process.env.DB_PASSWORD;
}

module.exports = checkPassword;
