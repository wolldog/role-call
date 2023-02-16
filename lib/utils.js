const db = require("../db/config");

// Query database and display results
const displayResult = (sql, nextAction) => {
  db.query(sql, function (err, results) {
    console.table(results);
  });
};

module.exports = {
  displayResult,
};