const express = require('express');
const mysqlConnection = require('../connection');
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
require("dotenv").config();
const multer = require('multer');
const upload = multer();

const sendRes = require('../controllers/sendRes');
const check = require('../middleware/checkUser');

const router = express.Router();

let sql;

router.post('/signup', upload.none(), function (req, res) {
	const { first_name, last_name, email, password } = req.body;
	if (first_name && last_name && email && password) {
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
	} else {
		sendRes(0, res, undefined, 'INSUFFICIENT DATA')
	}
});

router.post('/signin', upload.none(), function (req, res) {	
	const { email, password, keepMeSignedIn } = req.body;
	let hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

	const _userId = req.cookies.userId
	const _authToken = req.cookies.authToken
	let userId, JWTtoken, authorizationId;

	const fetchUser = () => {
		if (email && password && keepMeSignedIn) {
			sql = `SELECT USER_ID, PASSWORD FROM USERS WHERE EMAIL='${email}'`;
			mysqlConnection.query(sql, (e, r) => checkUser(e, r))
		} else {
			sendRes(0, res, undefined, 'INSUFFICIENT DATA')
		}
	}

	const checkUser = (err, result) => {
		if (err) {
			console.log(err);
		} else {
			if(result.length === 0){
				sendRes(0, res, 1, 'INVALID USERNAME OR PASSWORD')
			} else {
				if (hashedPassword === result[0]['PASSWORD']) {
					userId = result[0]['USER_ID']
					// console.log('User ID: ', userId);
					if(userId !== parseInt(_userId)) {
						console.log('Logging in new user...');
					}
					if(_authToken) {
						// console.log('Query with auth token');
						sql = `SELECT JWT_TOKEN FROM USER_AUTH WHERE USER_ID='${userId}' AND AUTH_ID='${_authToken}';`
					} else {
						// console.log('Query w/o auth token');
						sql = `SELECT JWT_TOKEN FROM USER_AUTH WHERE USER_ID='${userId}';`
					}
					mysqlConnection.query(sql, (e, r) => checkAuthToken(e, r))
				} else {
					sendRes(0, res, 2, 'INVALID USERNAME OR PASSWORD')
				}
			}
		}
	}

	// Check auth token of DB
	const checkAuthToken = (err, result) => {
		if (err) {
			sendRes(-1, res)
		} else {
			if (keepMeSignedIn === 'true') {
				JWTtoken = jwt.sign(
					{
						userId: userId,
					},
					process.env.SECRET,
					{
						expiresIn: '7 days',
					}
				);
			} else {
				JWTtoken = jwt.sign(
					{
						userId: userId,
					},
					process.env.SECRET,
					{
						expiresIn: '2h'
					}
				);
			}

			// console.log('JWT token: ', JWTtoken);
			// console.log('Cookie authToken: ',_authToken);
			// console.log('Result len of tokens: ', result.length);
			if (result.length === 0 && _authToken) {
				res
					.cookie('userId', undefined)
					.cookie('authToken', undefined)
				sendRes(0, res, undefined, 'UNAUTHORISED');
			} else {
				if (!_authToken){
					console.log('Generating new token');
					sql = `INSERT INTO USER_AUTH (USER_ID, JWT_TOKEN) VALUES ('${userId}', '${JWTtoken}');`
				} 
				else {
					console.log('Updating token');
					sql = `UPDATE USER_AUTH SET JWT_TOKEN='${JWTtoken}' WHERE USER_ID='${userId}' AND AUTH_ID='${_authToken}';`
				}
				mysqlConnection.query(sql, (e, r) => {
					if (e) {
						// console.log((e));
						sendRes(-1, res)
					} else {
						// console.log(r);
	
						if (keepMeSignedIn === 'true') {
							res
								.cookie('userId', userId, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 })
								.cookie('authToken', _authToken ? _authToken : r['insertId'], { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 })
						} else {
								res
									.cookie('userId', userId, { httpOnly: true, maxAge: 1000 * 60 * 60 * 2 })
									.cookie('authToken', _authToken ? _authToken : r['insertId'], { httpOnly: true, maxAge: 1000 * 60 * 60 * 2 })
						}
	
						let data = {
							USER_ID: userId
						}
						sendRes(1, res, data)
					}
				})
			}
			// else {
			// 	sendRes(1, res)
			// }
		}
	}

	fetchUser()
});

router.get('/check', check, (req, res) => {
	data = {
		USER_ID: parseInt(req.cookies.userId)
	}
	sendRes(1, res)
})

module.exports = router;