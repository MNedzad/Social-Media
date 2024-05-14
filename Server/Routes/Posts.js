const express = require("express");

const router = express.Router();
const { Posts, Likes, Image, Follow, PostSeen, Users } = require("../models");
const { validateToken } = require('../middlewares/authMiddlewares');
const { info } = require('../util/consolelog');


function resolveAfter2Seconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 2000);
    });
}
const isFollow = (async (userid, followid) => {
    console.log(userid);
    console.log(followid);
    const follow = await Follow.findOne({ where: { UserId: userid, Follow: followid } })
    console.log(follow);
    if (followid === userid || follow) {
        return true;
    } else {
        return false;
    }
})


router.get("/", validateToken, async (req, res) => {
    const userid = req.user.id;
    const username = req.user.username;
    console.log(req.user);

    var listOfPosts = await Posts.findAll({ include: [Likes, Image, PostSeen], where: { PostRole: "Public" } });
    var PrivatelistOfPosts = await Posts.findAll({ include: [Likes, Image], where: { PostRole: "Private" } });
    //x
 


   
    await PrivatelistOfPosts.forEach(async (Post, I, object)=> {
        const PostUID = Post.UserId;

        const validate = await isFollow(PostUID, userid);
        console.log("validate" + validate);
        
        if(!validate){
            object.splice(I, 1)
        }
    
    });


    var num = 0;
    var filter = await listOfPosts.filter(post => {
        postId = post.id
        PostUID = post.UserId;
       
        if (post.PostSeens[0] === undefined && num != num + 100 || userid === PostUID) {
            //if(userid != PostUID) PostSeen.create({ PostId: postId, UserId: userid });
            num++;
            return true;
        }
       
        num++;

    })
   
    
    await resolveAfter2Seconds();

    var allPosts = filter.concat(PrivatelistOfPosts)

    allPosts.reverse();
    res.json(allPosts)

})


router.get("/byId/:id", async (req, res) => {

    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
})

router.post('/', validateToken, async (req, res) => {
    const post = req.body;
    const userId = req.user.id;
    const username = req.user.username;


    let postid = null;
    //console.log(req.user);
    post.username = username;
    post.UserId = userId;


    await Posts.create(post).then((event) => {
        res.json("Post Created")
    });


})

module.exports = router