const  express  = require("express");
const router = express.Router();
const {Follow} = require("../models");
const {validateToken} = require('../middlewares/authMiddlewares')


router.post('/',validateToken, async (req,res) =>{
    const follow = req.user.id;
    const {UserId} = req.body;
    const found = await Follow.findOne({where:{ UserId:UserId, Follow: follow}})
    
    console.log(found);
    if(!found){
        await Follow.create({Follow: follow, UserId:UserId});
        res.json("Follow")
    }else{
        Follow.destroy({where: {UserId:UserId, Follow: follow}});
        res.json("UnFollow")
    }
    
})
router.get("/:id",validateToken, async(req,res) =>{
    const UserId = req.params.id;
    const follow = req.user.id;
    const found = await Follow.findOne({where:{UserId: UserId , Follow: follow}})
    
    
    if(found){
        res.json({follow: "Following"})
        console.log("Follow");
    }else{
        res.json({follow: "Follow"})
        console.log("UnFollow");

    }
})

module.exports = router