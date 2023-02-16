const mysql = require('mysql2');


// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'ZyXCMIObD32q',
      database: 'staff_db'
    },
    console.log(`Connected to the staff_db database.`)
  );
  
module.exports = db;