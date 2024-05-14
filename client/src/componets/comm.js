import { Avatar } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import ConfigData from "../config.json"



function Comm(props) {
  const adress = ConfigData["U2VydmVyLVNpZGUtSXA="]
  const id = props.id;
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const GetComments = async () =>{
      await axios.request({method: "GET", url: `${adress}comments/${id}`, headers: {accessToken: localStorage.getItem("accessToken")}})
      .then((res) => {
        
        setComments(res.data);

      })
    }
    GetComments();
   
  }, []);
  const likecomment = (id) =>{
    axios.post(`${adress}commlikes`, 
    {
      CommentId: id
    },
    {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }
    ).then((res) =>{
      setComments(comments.map((post) => {
        if (post.id === id) {
          if (res.data.liked) {
            const liked = res.data;
            return { ...post, Comlikes: [...post.Comlikes, 0], liked };
          } else {
            const liked = res.data;
            const likesArray = post.Comlikes;
            likesArray.pop();
            return { ...post, Comlikes: likesArray ,liked};
          }
        } else {
          return post;
        }
      })

      );
    })
  }

  return (
    <div>
      {comments.map((comment, key) => {
        
        // return (
        //   <div key={key} className="comment">

        //     {comment.CommentBody}
        //     <br></br>
        //     <label>Username: {comment.username}</label>
        //   </div>
        // );
        const com_Length = comment.Comlikes.length

        let userliked
        for (let i = 0; i < com_Length; i++) {
          const postUserId = comment.Comlikes[i].UserId
          const userid = props.userId;
          if(postUserId == userid){
            userliked = true
            break
          }else{
            userliked = false
          }
        }
        
        let like = comment.liked !== undefined ? comment.liked.liked : null
        
        let found = like == null ? userliked : like;
       
        const id = comment.id
        return (
          <div className="comm" key={key}>
            <div className="userdate">
              <Avatar></Avatar>
              <h1>{comment.username}</h1>
            </div>
            <div className="bodycomm">
              <h1>{comment.CommentBody}</h1>
            </div>
            <div className="like">
              <span>{com_Length}</span>
              <button onClick={()=>{likecomment(id)}}>                
                {props.state == true ? (
                      found ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderSharpIcon />
                      )
                    ) : (
                      <FavoriteBorderSharpIcon />
                    )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Comm;
