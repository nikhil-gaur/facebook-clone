import React from 'react';
import "./Feed.css"
import StoryReel from './StoryReel';
import MessageSender from './MessageSender';
import Post from './Post';
import db from "./firebase";
import { useState } from 'react';
import { useEffect } from 'react';




function Feed() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        
        db.collection("posts")
        .orderBy("timestamp", "desc")
        .onSnapshot( 
            (snapshot) => setPosts(snapshot.docs.map( (doc) => ({ id:doc.id, data:doc.data() }) ))
        );

    }, []);

    return (
        <div className="feed">

        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

            <StoryReel className="storyReelInFeed" />
            <MessageSender />
            {posts.map(
                (post) => (
                    <Post
                        className="post__card"
                        Key={post.id}
                        postId={post.id}
                        profilePic={post.data.profilePic}
                        message={post.data.message}
                        timestamp={post.data.timestamp}
                        username={post.data.username}
                        image= {post.data.image}
                    />
                )

            )}
             
        </div>
    )
}

export default Feed;
