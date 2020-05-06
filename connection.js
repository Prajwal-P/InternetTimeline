const mysql = require('mysql');

var conn = mysql.createConnection({
    host: "sql12.freesqldatabase.com",
    user: "sql12338342",
    password: "veBrCsaaNA",
    database: "sql12338342"
});

conn.connect(function(err) {
    if(err) throw err;

    let user = `CREATE TABLE IF NOT EXISTS users(
                    id INT NOT NULL AUTO_INCREMENT,
                    first_name VARCHAR(20) NOT NULL,
                    last_name VARCHAR(20) NOT NULL,
                    email VARCHAR(30) NOT NULL,
                    password VARCHAR(100) NOT NULL,
                    auth_key DATETIME DEFAULT NULL,
                    PRIMARY KEY (id),
                    UNIQUE (email)
                )auto_increment = 2000;`;

    conn.query(user, function(err, result){
        if(err) console.log(err);
    })
})

module.exports = conn;