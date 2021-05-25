import React, { useState, useEffect} from 'react';
import "./Post.css";
import { Avatar, Button, IconButton } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import NearMeIcon from '@material-ui/icons/NearMe';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Comment, MoreVert } from '@material-ui/icons';
import db from './firebase';
import firebase from 'firebase';
import {useStateValue} from './StateProvider';
import MoreVertIcon from '@material-ui/icons/MoreVert';






function Post( {Key, postId, profilePic, image, username, timestamp, message } ) {

    const [{user}, dispatch] = useStateValue();

    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [likeCount, setLikeCount] = useState(0);
    // const [commentVisible, setCommentVisible] = useState(false);

    var postLikeStatus = false;
    var whichLike;

    useEffect(() => {
        let unsubcribe;
        if (postId) {
            unsubcribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy('timestamp', 'asc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
                });
    
            }
        return () => {
            unsubcribe();
        }
        
    }, [postId]);

    useEffect(() => {
        let unsubcribe1;
        if (postId) {
            unsubcribe1 = db
                .collection("posts")
                .doc(postId)
                .collection("likes")
                .onSnapshot((snapshot) => {
                    setLikes(snapshot.docs.map((doc) => ({ likeId:doc.id, data:doc.data() }))); 
                });
    
            }
            
        return () => {
            unsubcribe1();
        }
        
    }, [postId]);
    
    const postComment = (event) => {
        event.preventDefault();
        db.collection("posts").doc(postId).collection("comments").add({
            avatar: user.photoURL,
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        setComment('');
    }

    const postLiked = (event) => {
        event.preventDefault();

        db.collection("posts").doc(postId).collection("likes").add({
            username: user.displayName,
            emailId: user.email
        })
    }

    const postUnliked = (event) => {
        event.preventDefault();

        db.collection("posts").doc(postId).collection("likes").where("emailId", "==", user.email).get()
        .then(querySnapshot => {
            querySnapshot.docs[0].ref.delete();
        });
    }

    const checkPostLikeStatus = () => {
        for(var i=0; i<likes.length; i++) {

            if (user.email == likes[i].data.emailId) {
                postLikeStatus = true;
                
                break;
            }
            else {
                postLikeStatus = false ;
            }
        }; 
           
        
    }

    // const showCommentSection = (event) => {
    //     event.preventDefault();
       
    //     if (commentVisible) {
    //         setCommentVisible(false);
    //     }
    //     else {
    //         setCommentVisible(true);
    //     }
    // };
 
    const showPostCommentSection = (event) => {
        event.preventDefault();
        // document.querySelector('.post__commentSection').classList.toggle('commentSectionHide');
    }
    

    return (
        <div className="post">
            <div className="post__top">
                <Avatar src={profilePic}
                    className="post__avatar" />
                <div className="post__topInfo">
                    <h3>{username}</h3>
                     <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
                
                </div>   
                 
            </div>
            
            <div className="post__bottom">
                <p>{message}</p>
            </div>

            <div className="post__image">
                <img src={image} alt="" />
            </div>

            <div className = "post__likeCount">
            <div className="post__likeCountInner">
                <center>
                    {
                        likes ? (
                            <div className="like__count">
                                <div className="like__icon">
                                    <ThumbUpIcon style={{ fill: 'white', fontSize: '13px'}} />
                                </div>
                                <div>
                                    <p>{likes.length}</p>
                                </div>
                             
                            </div>
                            
                            ): (<p>0</p>)
                    }
                </center>
            </div>
        </div>

            <div className="post__options">

            {
                checkPostLikeStatus()
            }
            
                <div className="post__option" onClick={postLikeStatus ? (postUnliked):(postLiked) }>
                    <IconButton>
                        {
                            postLikeStatus ? (<ThumbUpIcon style={{ fill: '#1778F2' }}/>):(<ThumbUpIcon />)
                        }
                        
                    </IconButton>
                    <p>Like</p>
                </div>
                <div className="post__option commentIcon" onClick={showPostCommentSection}>
                    <IconButton>
                      <ChatBubbleOutlineIcon />
                    </IconButton>  
                    <p>Comment</p>
                </div>
                <div className="post__option">
                    <NearMeIcon />
                    <p>Share</p>
                </div>
                <div className="post__option expandMore">
                    <AccountCircleIcon />
                    <ExpandMoreIcon />
                    <p>Like</p>
                </div>
            </div>   
            
                <div className="post__commentSection">

                    <div className="post__commentBox">
                    {
                        comments.map((comment) => (
                            <div className="individual__comment">
                                <div classname="user__info">
                                    <Avatar className="individual__commentAvatar" src={comment.avatar} />
                                    
                                </div>
                                
                                <div className="user__comment">

                                    <p>
                                    <strong>{comment.username}</strong>
                                    </p>
                                    <p>
                                        {comment.text}
                                    </p>
                                  
                                </div>
                                
                            </div>
                            
                        ))
                    }
                    </div>

                <div>
                    <form className="post__commentInput">
                        <Avatar className="post__commentInputAvatar" src={user.photoURL}/>
                        <input 
                            className="comment__input" 
                            type="text"
                            placeholder="Add a comment here..." 
                            value={comment} 
                            onChange={(e) => setComment(e.target.value)} 
                        />

                        <button
                            className="comment__button"
                            type="submit"
                            disabled={!comment}
                            onClick={postComment}
                            
                        >
                        POST
                        </button>
                    </form>
                </div>

            </div>
        
        </div>
    )
}

export default Post;
