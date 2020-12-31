const { Pool } = require("pg");

const PG_URI = process.env.DB_URL
const pool = new Pool({
    connectionString: PG_URI
  })

  module.exports = {
    query: (text, params, callback) => {
      console.log("executed query", text);
      return pool.query(text, params, callback);
    },
    connect: (text, params, callback) => {
      console.log("executing transaction")
      return pool.connect(text, params, callback)
    }
  }