import React from "react";
import { useEffect, useState, useContext } from "react";
import { Await, useNavigate } from "react-router-dom";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import { Stack } from "@mui/system";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ConfigData from "../config.json";
import moment from "moment";
import Comm from "./comm";
import { AuthContext } from '../pages/Helper/authContext';
import login from "../pages/Login";
import { useToast } from "@chakra-ui/toast";
import { useAsync, useFetch } from "react-async";
import { useForceUpdate } from "framer-motion";

const elemet = document.querySelector('.ground')


function Card(props) {
  const toast = useToast();
  const adress = ConfigData["U2VydmVyLVNpZGUtSXA="];
  const userId = props.userid;
  const nav = useNavigate();
  const [listofpost, setListodPost] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const { authState, setAuthState } = useContext(AuthContext);



  const buttonup = (e, value) => {
    let body = newComment;
    let postid = value.id;
    const key = e.code;
    if (key == "Enter") {
      axios
        .post(
          `${adress}comments`,
          { CommentBody: body, PostId: postid },
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        )
        .then((res) => {
          if (res.data.error) {
            toast({
              title: "Error",
              description: res.data.error,
              status: "error",
              duration: 1000,
              isClosable: true,
            });
          } else {
            const commentToAdd = { CommentBody: newComment };
            setComments([...comments, commentToAdd]);
            setNewComment("");
          }
        });
    }
  };
  useEffect(() => {


    const GetPosts = async () => {


      await axios.request({ method: "GET", url: `${adress}posts`, headers: { accessToken: localStorage.getItem("accessToken") } })
        .then((res) => {

          setListodPost(res.data);
        })


    }
    GetPosts();



  }, []);



  const likepost = (postId) => {
    //dss.innerHtml = `<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="FavoriteIcon"><path d="m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>`
    axios
      .post(
        `${adress}likes`,
        { PostId: postId },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((res) => {
        setListodPost(
          listofpost.map((post) => {
            if (post.id === postId) {
              if (res.data.liked) {
                const liked = res.data;
                return { ...post, Likes: [...post.Likes, 2], liked };
              } else {
                const liked = res.data;
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray, liked };
              }
            } else {
              return post;
            }
          })
        );
      });

  };


  if (authState === true) {


    return (


      <div className="posts-list">


        {listofpost.map((value, key) => {
          let like_Length = value.Likes.length;



          let userliked;
          for (let i = 0; i < like_Length; i++) {
            const postUserId = value.Likes[i].UserId;
            const userid = props.userid;
            if (postUserId == userid) {
              userliked = true;
              break;
            } else {
              userliked = false;
            }
          }
          let like = value.liked !== undefined ? value.liked.liked : null;
          let found = like == null ? userliked : like;






          const time = value.createdAt;
          const realtime = moment(time).utc().format("YYYY-MM-DD");
          const names = value.Image !== undefined ? true : value.Images[0];
          const name = names !== undefined ? value.Images[0].ImageName : false;

          return (
            <div key={key} className="post" >
              <div className="overlay">
                <div className="title">
                  <div className="info">
                    <div className="avatar">
                      <Avatar>A</Avatar>
                    </div>
                    <div className="username">
                      <h1>{value.username}</h1>

                      <h5>{realtime}</h5>
                    </div>
                  </div>
                  {value.UserId === userId ? (
                    <button id={'Edit'}>Edit Post</button>

                  ) : (
                    <button
                      onClick={(e) => {
                        follow(e, value.UserId);
                      }}
                    >
                      {<Follow value={value} />}
                    </button>
                  )}

                </div>

                <div className="body">
                  <div className="Title">
                    <h1>{value.postText} </h1>
                  </div>
                  <div className="image">
                    <img src={`${adress}images/username/${name}`}></img>
                    <div className="overlay"></div>
                    <div className="footer">
                      <div className="ftitle">
                        <h4>{value.title}</h4>
                      </div>
                      <div className="likes">

                        <button
                          id="like"
                          onClick={(e) => {
                            likepost(value.id, e);
                          }}
                        >

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
                        <span>{value.Likes.length}</span>
                      </div>

                      <div className="fcomment">
                        <button id="comment" onClick={e => {
                          let Icon = e.target.parentElement.parentElement.querySelector('[data-testid="QuestionAnswerIcon"]');
                          let OutlinedIcon = e.target.parentElement.parentElement.querySelector('[data-testid="QuestionAnswerOutlinedIcon"]');
                          let ComList = e.target.closest(".post").querySelector(".comdisp");

                          if (Icon.style.display === "none" || Icon.style.display === "") {
                            Icon.style.display = "block";
                            OutlinedIcon.style.display = "none";
                            ComList.style.display = "block";
                          } else {
                            Icon.style.display = "none";
                            OutlinedIcon.style.display = "block";
                            ComList.style.display = "none";
                          }

                        }}>
                          {
                            <>

                              <QuestionAnswerOutlinedIcon />
                              <QuestionAnswerIcon />

                            </>


                          }
                        </button>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
              <div className="comdisp">
                <div className="commentList">
                  {
                    <Comm
                      id={value.id}
                      state={props.state}
                      userId={props.userid}
                    ></Comm>
                  }

                  {/* <div className='comm'>
                    <div className='userdate'>
                      <Avatar></Avatar>
                      <h1>Necko</h1>
                    </div>
                    <div className='bodycomm'>
                      <h1>saiofpaosd</h1>
                    </div>
                    <div className='like'><FavoriteIcon /></div>
                  </div> */}
                </div>
                <div className="postcomment">
                  <input
                    type={"text"}
                    tabIndex="3"
                    placeholder="Post a Comment..."
                    onKeyUp={(e) => {
                      buttonup(e, value);
                    }}
                    onChange={(e) => {
                      setNewComment(e.target.value);
                    }}
                  ></input>
                  <EmojiEmotionsIcon></EmojiEmotionsIcon>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}


const follow = (e, id) => {
  var elemet = e.target

  const adress = ConfigData["U2VydmVyLVNpZGUtSXA="];
  axios.post(
    `${adress}follow`,
    { UserId: id },
    {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }
  ).then(res => {
    var data = res.data
    if (data == "Follow") elemet.innerHTML = "Following";
    else elemet.innerHTML = "Follow";
  })
};

const Follow = ({ value }) => {
  const adress = ConfigData["U2VydmVyLVNpZGUtSXA="];
  // const { data, error } = useAsync({ promiseFn: fetchFollow, value })
  // console.log(data);
  // return data

  const { data, error } = useFetch(`${adress}follow/${value.UserId}`, {
    headers: {
      accept: "application/json",
      accessToken: localStorage.getItem("accessToken"),
    },
  });
  if (data) return data.follow;
};

export default Card;
