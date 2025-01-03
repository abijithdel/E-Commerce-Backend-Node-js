const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(file.fieldname === 'img'){
            cb(null, './public/pro-imgs')
        } else if(file.fieldname === 'posterimg'){
            cb(null, './public/poster-img')
        } else if(file.fieldname === 'newimg'){
            cb(null, './public/pro-imgs')
        }
        
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg')
    }
})

const upload = multer({ storage: storage })

module.exports = upload;