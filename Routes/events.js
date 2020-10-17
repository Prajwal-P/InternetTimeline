const express = require('express');
const mysqlConnection = require('../connection');
const multer = require('multer');

// Specify storage space
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './buffer')
	},
	filename: function (req, file, cb) {
		// console.log(file);
		cb(null, `${new Date().toISOString()}-${file.originalname}`)
	}
});

//Filter for type of files
const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true)
	} else {
		// Prevent upload
		cb({ MESSAGE: 'UNSUPPORTED FILE TYPE' }, false)
	}
}

const upload = multer({
	storage: storage,
	limits: { fileSize: 1024 * 1024 },
	fileFilter: fileFilter
})

const sendRes = require('../controllers/sendRes');
const check = require('../middleware/checkUser');
const cloudinary = require('../cloudinary');
const fs = require('fs');

const router = express.Router();

let sql;

router.post('/insert', check, upload.single('image'), async (req, res) => {
	const { name, year, description, link } = req.body;
	let image;

	if(name && year && description && link) {
		image = await cloudinary.uploadImage(req.file.path, 'InternetTimeline')
		fs.unlinkSync(req.file.path)
		
		sql = `INSERT INTO EVENTS(NAME, YEAR, IMG_URL, DESCRIPTION, LINK) VALUES ('${name}', ${year}, '${image.url}', '${description}', '${link}');`;
		mysqlConnection.query(sql, (err, result) => {
			if(err) {
				if(err.code = 'ER_DUP_ENTRY') {
					console.log('Inserting duplicate event');
					console.log(err);
					sendRes(-1, res, undefined, 'INSERTING DUPLICATE EVENT')
				} else {
					console.log('Error in inerting to DB');
					console.log(err);
					sendRes(-1, res)
				}
			} else {
				sendRes(1, res)
			}
		})
	}

})

module.exports = router;