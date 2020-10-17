const sendRes = require('../controllers/sendRes')
const mysqlConnection = require('../connection')
const jwt = require('jsonwebtoken')
require("dotenv").config();

module.exports = (req, res, next) => {
	let userId = req.cookies.userId
	let authId = req.cookies.authToken

	if(userId && authId) {
		let sql = `SELECT JWT_TOKEN
				   FROM USER_AUTH
				   WHERE USER_ID='${userId}' AND 
				   AUTH_ID='${authId}';`
		mysqlConnection.query(sql, (err, result) => {
			if(err) {
				sendRes(-1, res)
			} else {
				let decode = jwt.decode(result[0]['JWT_TOKEN'])
				let exp = new Date(0)
				exp.setUTCSeconds(decode['exp'])
				let now  = new Date()
				if(now <= exp) {
					next()
				} else {
					sendRes(0, res, undefined, 'SESSION TIMED OUT')
				}
			}
		})
	} else {
		sendRes(0, res)
	}
}