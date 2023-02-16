import multer from 'multer';

export const formDataUtil = multer({
	limits: {
		fileSize: 1024 * 1024 * 15, // 15MB
	},
	fileFilter: (req, file, cb) => {
		if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
			cb(null, true);
		} else {
			cb(null, false);
		}
	},
});
