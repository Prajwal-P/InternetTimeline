var cloudinary = require('cloudinary').v2;
require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

exports.uploadImage = (file, folder) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file,
            {
				upload_preset: 'InternetTimeline'
            },
            (err, result) => {
				if(err) {
					console.log('Error in uploading file');
					console.log(err);
				} else {
					resolve({
						url: result.secure_url,
						id: result.public_id
					})
				}
			},
			{
			    resource_type: 'image',
			    folder: folder
			}
		)
    })
}

exports.upload = cloudinary.uploader.upload;