//const Pool = require('pg').Pool;
const { Pool, Client } = require('pg');

const pool = new Pool({
	// user: "connUser",
	// password: "DB4Remesh!",
	user: "Stacie",
	host:"localhost",
	database:'remesh',
	password:"925N0@h",
	port:5432
});
module.exports = pool;