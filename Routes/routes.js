const express = require('express');
const multer = require('multer');
// const mysqlConnection = require('../connection.js');

const upload = multer();

const router = express.Router();

router.get('/test', function (req, res) {
    res.json({ data: "Sample run", status: 200, message: "Test API" });
});

module.exports = router;