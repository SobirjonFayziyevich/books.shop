const path = require('path');
const multer = require('multer');
const uuid = require('uuid');


// MULTER IMAGE STORAGE
function getTargetImageStorage(address) {
    return multer.diskStorage({     //diststorageni yasab packageni ichiga yuklanyabdi
        destination: (req, file, cb) => {  //qayerga yuklashini ko'rsatyabdi
            cb(null, `./uploads/${address}`);
        },
        filename: function (req, file, cb) {
            console.log(file);
            const extension = path.parse(file.originalname).ext;
            const random_name = uuid.v4() + extension;
            cb(null, random_name);
        },
    });
}

const makeUploader = (address) => {
    const storage = getTargetImageStorage(address);
    return multer({storage: storage});
}
module.exports = makeUploader; 