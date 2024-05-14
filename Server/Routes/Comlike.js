const  express  = require("express");
const router = express.Router();
const {Comlike} = require("../models");
const {validateToken} = require('../middlewares/authMiddlewares')


router.post('/',validateToken, async (req,res) =>{
    const {CommentId} = req.body;
    const UserId = req.user.id;
    
    const found = await Comlike.findOne({where:{ CommentId: CommentId, UserId: UserId}})
    
    if(!found){
        await Comlike.create({CommentId: CommentId, UserId: UserId});
        res.json({liked: true});
    }
    else{
        await Comlike.destroy({
            where:{CommentId: CommentId, UserId: UserId}

        });
        res.json({liked: false});
    }
})
router.get("/:commId", async(req,res) =>{
    const commId = req.params.commId;
    const comlike = await Comlike.findAll({where:{CommentId: commId }})
    res.json(comlike);
})

module.exports = router