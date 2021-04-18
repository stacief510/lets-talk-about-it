//const Pool = require('pg').Pool;
const { Pool, Client } = require('pg');

const pool = new Pool({
	// user: "connUser",
	// password: "DB4Remesh!",
	user: "Stacie",
	host:"localhost",
	database:'remesh',
	
	port:5432
});
module.exports = pool;