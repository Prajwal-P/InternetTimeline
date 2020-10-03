const express = require('express');
const mysqlConnection = require('../connection');
const crypto = require('crypto');
const multer = require('multer');
const upload = multer();

const sendRes = require('../controllers/sendRes');

const router = express.Router();

let sql;

router.post('/signup', upload.none(), function (req, res) {
	const { first_name, last_name, email, password } = req.body;
	let hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
	sql = `INSERT INTO USERS(FIRST_NAME, LAST_NAME, EMAIL, PASSWORD)
			VALUES('${first_name}', '${last_name}', '${email}', '${hashedPassword}');`
	mysqlConnection.query(sql, function (err, result) {
		if (err) {
			if (err.code === 'ER_DUP_ENTRY') {
				sendRes(0, res, undefined, 'EMAIL ALREADY EXISTS, PLEASE LOGIN')
			} else {
				sendRes(-1, res)
			}
		} else {
			sendRes(1, res, undefined, 'USER REGISTERED SUCCESSFULLY')
		}
	});
});

module.exports = router;