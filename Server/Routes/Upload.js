const  express  = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const {validateToken} = require('../middlewares/authMiddlewares');
const {Image, Posts} = require("../models");


const multer = require("multer");

const username = null;

const StorgeEngine = multer.diskStorage({
    destination: `./images/${"username"}`,
    filename: (reg, file, cb)=>{
        const img = file.originalname
         cb(null,`${img}`)
    }
    
})

const path = require("path");

const checkFileType = function (file, cb) {
//Allowed file extensions
const fileTypes = /jpeg|jpg|png|gif|svg/;

//check extension names
const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

const mimeType = fileTypes.test(file.mimetype);

if (mimeType && extName) {
return cb(null, true);
} else {
cb("Error: You can Only Upload Images!!");
}
};

const upload = multer({
    storage: StorgeEngine,
    limits: { fieldSize: 1000000 },
    fileFilter: (req, file, cb)=>{
        checkFileType(file, cb);
    }
});



router.post('/',validateToken, upload.single('image'),  async(req,res) =>{

    

        
       
        if (!req.file) {
            res.json("No file upload");
        } else {
            const {PostId} = req.body;
            console.log(req.body);
            
            const Role = req.body.PostRole;
            const filename = req.file.filename;
            const post = req.body;
            const userId = req.user.id;
            const username = req.user.username;
            post.username = username;
            post.UserId = userId;
            post.PostRole = Role;
            //console.log(post);
            await Posts.create(post).then(async(event) =>{
                await Image.create({ImageName: filename, PostId: event.id})
            });

            

            
            
            res.json("Photo Upload!")
        }
    
})

module.exports = router