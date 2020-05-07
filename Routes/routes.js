const express = require('express');
const bodyParser = require('body-parser');
const mysqlConnection = require('../connection');
const crypto = require('crypto');
const multer = require('multer');
const upload = multer();

const router = express.Router();

let sql;

router.get('/test', function (req, res) {
    res.json({ data: "Sample run", status: 200, message: "Test API" });
});

router.post('/signup', upload.none(), function (req, res) {
    const { first_name, last_name, email, password } = req.body;
    var hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    sql = "INSERT INTO `users`(first_name, last_name, email, password) VALUES ('" + first_name + "' , '" + last_name + "' , '" + email + "' ,'" + hashedPassword + "')";
    mysqlConnection.query(sql, function (error, result) {
        if (error) {
            res.send({ data: "", status: 401, message: "Email exists" });
        } else {

            sql = "Select first_name, last_name, email from users where email ='" + email + "'";
            mysqlConnection.query(sql, function (error, result1) {
                if (error) console.log(error);
                res.send({ data: result1, status: 201, message: "Data Inserted" });
            })
        }
    });
});

router.post('/signin', upload.none(), function (req, res) {
    const { email, password } = req.body;
    var hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    var sql = "select * from users where email ='" + email + "'";
    mysqlConnection.query(sql, function (error, result) {
        if (error) {
            res.send({ data: "", status: 404, message: 'error in query' });
        }
        else {
            if(result.length > 0) {
                if(hashedPassword === result[0].password) {
                    if(result[0].auth_key === null){
                        sql = "UPDATE users set auth_key = 123 WHERE email = '"+ email +"'";
                        mysqlConnection.query(sql, function (error, result1) {
                            if(error) console.log(error)
                        })
                        sql = "select * from users where email ='" + email + "'";
                        mysqlConnection.query(sql, function (error, result) {
                            if(error) console.log(error)
                            else res.json({ data: result[0].auth_key, status: 200, message: 'signed in' });
                        })
                    } else {
                        sql = "UPDATE users set auth_key = null WHERE email = '"+ email +"'";
                        mysqlConnection.query(sql, function (error, result1) {
                            if (error) console.log(error)
                        })
                        sql = "select * from users where email ='" + email + "'";
                        mysqlConnection.query(sql, function (error, result) {
                            if (error) console.log(error)
                            else res.json({ data: result[0].auth_key, status: 401, message: 'Previous session was not signed out properly.\nSign in again' });
                        })
                    }
                }
                else {
                    res.json({ data: "", status: 401, message: 'Invalid password' });
                }
            } else res.json({ data: "", status: 401, message: 'You have not regitered with us' });
        }
    });
});


module.exports = router;