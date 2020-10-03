const mysql = require('mysql');
const queries = require('./tables');

let connection = mysql.createConnection({
    host: "remotemysql.com",
    user: "iYgECwNZCY",
    password: "I9VuKhVHse",
    database: "iYgECwNZCY"
});

// let connection = mysql.createConnection({
// 	host: "localhost",
// 	user: "root",
// 	password: "",
// 	database: "InternetTimeline"
// });

connection.connect((err) => {
	if (err) {
		console.log('Database not connected');
	} else {
		queries.map((query, i) => {
			// , (err, result) => {
			// 	if (err) console.log(`Table ${i} :-\n${err}`);
			// 	else console.log(`Table ${i} :-\n${result}`);
			// }
			connection.query(query)
			if (i === queries.length - 1) {
				console.log('Database connected...\n');
			}
		})
	}
})

function handleConnection() {
	setInterval(() => {
		console.log(`>>>>>    Handeling connection    <<<<<\n`);
		connection.query(`SELECT * FROM TBL_USER_DETAILS`, (err, result) => {
			if (err) {
				console.log(`Invaild query\nConnection can get terminated\n`);
			} else {
				console.log(`Connection handled\n`);
				// console.log(`Result of query :-\n`);
				// console.log(result);
				// console.log(`\n----------------------------------------\n`);
			}
		})
	}, 1000 * 60 * 4)
}

handleConnection();

module.exports = connection;