const mysql = require('mysql');

let connection1 = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
})

let connection2 = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "InternetTimeline"
});

connection1.query("CREATE DATABASE IF NOT EXISTS InternetTimeline", (err, result) => {
    if(err) {
        console.log('Database not created')
        console.log(err);
    } else {
        // console.log('Database created...\n\n');
        
        connection2.connect(function (err) {
            if (err) {
                console.log('Database not connected');
            } else {
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

                let timeline = `CREATE TABLE IF NOT EXISTS timeline(
                        name VARCHAR(20) NOT NULL,
                        year YEAR NOT NULL,
                        img_url VARCHAR(500) NOT NULL,
                        description VARCHAR(100) NOT NULL,
                        link VARCHAR(500) NOT NULL,
                    PRIMARY KEY (name));`

                connection2.query(user, function (err, result) {
                    if (err) console.log(err);
                    // else console.log('Users table created');
                })
                connection2.query(timeline, function (err, result) {
                    if (err) console.log(err);
                    // else console.log('Timeline table created\n\n');
                })
                console.log('Database connected...\n\n');
            }
        })
    }
})

module.exports = connection2;