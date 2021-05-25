import React, { useEffect, useState } from 'react';
import "./StoryReel.css";
import Story from './Story';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Button, IconButton } from '@material-ui/core';
import db from './firebase';
import {storage} from './firebase';
import firebase from 'firebase';
import { useStateValue } from './StateProvider';


function StoryReel() {

    const [{user}, dispatch] = useStateValue();


    const [stories, setStories] = useState([]);
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // progress function
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) *100
                );
            
                setProgress(progress);
            },
            (error) => {
                // error function 
                console.log(error);
                alert(error.message);
            }, 
            () => {
                // complete function
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        // post image inside database
                        db.collection("stories").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            profileSrc: user.photoURL,
                            title: user.displayName,
                            image: url,
                            
                            
                        });

                        console.log(url);

                        setProgress(0);
                        
                        
                        setImage(null);
                    })
                }
        )    
            }
                    
                
    useEffect(() => {
        
        db.collection("stories")
        .orderBy("timestamp", "desc")
        .onSnapshot( 
            (snapshot) => setStories(snapshot.docs.map( (doc) => ({ id:doc.id, data:doc.data() }) ))
        );

    }, []);

    return (
        <div className="storyReelContainer">

        <div className="storyReel">

            <div className="storyAdder">
                <progress className="storyUpload__progress" value={progress} max="100"/>
                <input className="storyUploader__input" type="file" onChange={handleChange} />
                <Button className="storyUploader__button" onClick={handleUpload} variant="contained" color="green">
                Upload
                </Button>
                <IconButton>
                    <AddCircleOutlineIcon className="storyAdder__button" fontSize="large"/>
                </IconButton>
                <h4 className="storyAdder__text">Add a Story</h4>

            </div>

            {
                stories.map((story) => (
                    <Story 
                        image={story.data.image}
                        profileSrc={story.data.profileSrc}
                        title={story.data.title}
                        timestamp={story.data.timestamp}
                    />
                ))

        }

        </div>
        </div>
            
    )
    }

    export default StoryReel;
