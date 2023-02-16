//File holds department VIEW/ADD/UPDATE functions

//Import dependancies
const db = require("../db/config");
const { displayResult } = require("./utils");

const viewDepartments = (nextAction) => {
    const sql = `SELECT * FROM staff_db.department`;
    displayResult(sql, nextAction);
  };

  module.exports = {
    viewDepartments
  };