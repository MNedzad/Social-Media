const  express  = require("express");
const router = express.Router();
const {Likes} = require("../models");
const {validateToken} = require('../middlewares/authMiddlewares')


router.post('/',validateToken, async (req,res) =>{
    const {PostId} = req.body;
    const UserId = req.user.id;

    const found = await Likes.findOne({where:{ PostId: PostId, UserId: UserId}})
    if(!found){
        await Likes.create({PostId: PostId, UserId: UserId});
        res.json({liked: true});
    }
    else{
        await Likes.destroy({
            where:{PostId: PostId, UserId: UserId}

        });
        res.json({liked: false});
    }
})
router.get("/:postId", async(req,res) =>{
    const postid = req.params.postId;
    const likes = await Likes.findAll({where:{PostId: postid }})
    res.json(likes);
})

module.exports = router