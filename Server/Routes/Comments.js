const  express  = require("express");
const router = express.Router();
const {Comments,Comlike} = require("../models");
const {validateToken} = require('../middlewares/authMiddlewares');
const {error,warning,info} = require('../util/consolelog');



router.get("/:postId", async(req,res) =>{
    const postid = req.params.postId;
   
    const comments = await Comments.findAll({where:{PostId: postid},include:[Comlike]})
    res.json(comments);
})
router.post('/',validateToken, async(req,res) =>{
    const comment = req.body;
    
    const username = req.user.username;
    
    comment.username = username;
    console.error( '\x1b[33m =============='+   comment + '  ============== \x1b[0m');
    await Comments.create(comment);
    res.json(comment)
})

module.exports = router