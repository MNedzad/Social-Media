import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Pagenot from './PageNotFound';
import ConfigData from "../config.json"


function Post() {
  const adress = ConfigData['U2VydmVyLVNpZGUtSXA=']
  const nav = useNavigate();
  
  try {
    

      let {id} = useParams();
      const [postObject, setPostObject] = useState({});
      const [comments, setComments] = useState([]);
      const [newComment, setNewComment] = useState("");
      



      useEffect(() =>{
        axios.get(`${adress}comments/${id}`).then((res) =>{
            setComments(res.data);
          
            
        });
          axios.get(`${adress}posts/byId/${id}`).then((res) =>{
              setPostObject(res.data)
              
          });
          
      }, [])
      const addComments =() =>{
        
        let body = newComment;
        
        axios.post(`${adress}comments`, 
        {CommentBody: body, PostId: id,
        },
        {
          headers:{
            accessToken: localStorage.getItem('accessToken'),
          },
        }
        ).then((res)=>{
          if(res.data.error){
            alert(res.data.error)
          }else{
            const commentToAdd = {CommentBody: newComment};
            setComments([...comments, commentToAdd]);
            setNewComment("");
      
          }
        })
      }
      return (
        <div className="postPage">
          <div className="leftSide">
            <div className="posts-list" id="individual">
              <div className="post" id="individual">
                <div className="title"> {postObject.title} </div>
                <div className="body">{postObject.postText}</div>
                <div className="footer">{postObject.username}</div>
                <div className='Comments'></div>
              </div>
            </div>
          </div>

          <hr></hr>
          <div className="rightSide">
            <div className='addComments'>
              <input type='text' placeholder='Comments..' autoComplete='off' onChange={(e) => {setNewComment(e.target.value)}}/>
              <div className='submit'>
                <button onClick={addComments}>Submit</button>
            </div>
          </div>
          
        <div className='listofComments'>
          {comments.map((comment, key) => {
              return (
                <div key={key} className="comment">
                  
                  {comment.CommentBody}
                  <br></br>
                  <label>Username: {comment.username}</label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
  } catch (error) {
    nav('/Pagenot')
  }

}

export default Post