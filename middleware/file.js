const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'images');
    },
    filename(req, file, cb){
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

const allowerTypes = ['image/png', 'image/jpeg', 'image.jpg', 'image/webp'];

const fileFilter = function(req, file, cb){
    if(allowerTypes.includes(file.mimetype)){
        cb(null, true);
    } else {
        cb(null, false);
    }
}

module.exports = multer({
    storage,
    fileFilter
});