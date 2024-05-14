const  express  = require("express");
const router = express.Router();
const {Users, Follow} = require("../models");
const {validateToken} = require('../middlewares/authMiddlewares')
const bcrypt = require('bcrypt');
const {sign} = require('jsonwebtoken');



router.post('/',async(req,res) =>{
    const {username, email, password} = req.body;
    bcrypt.hash(password,10).then((hash) =>{
        Users.create({
            username: username,
            email: email,
            password: hash,
        })
        res.json("Success") 
    });
});

router.post('/login', async(req,res) =>{
    const {username, password} = req.body;

    const user = await Users.findOne({where: {username: username}});

    if(!user){res.json({error: "User Doesn't Exist"}); return }

    bcrypt.compare(password, user.password).then((match) =>{
        if(!match){res.json({error: "Wrong Username and password"}); return} 
        
        const accessToken = sign(
            {username: user.username,id: user.id}, 
            "VWSCDQzRUZ");
        res.json(accessToken)
    })
    
})

router.get('/auth', validateToken ,async (req,res) =>{

    const username = req.user.username
    const user = await Users.findOne({ where:{username: username}})
    if(!user){
        (res.json({error: "Invalid Access Token"}))
    }
    else{
        console.log("tebe");
        res.json(req.user)
    }
})


module.exports = router