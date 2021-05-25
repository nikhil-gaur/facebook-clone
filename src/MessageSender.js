import React, {useState} from 'react';
import "./MessageSender.css";
import { Avatar, IconButton, Button, Input } from '@material-ui/core';
import VideocamIcon from '@material-ui/icons/Videocam';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { useStateValue } from './StateProvider';
import db from "./firebase";
import firebase from "firebase";
import {storage} from './firebase';
import { Visibility } from '@material-ui/icons';

function MessageSender() {
    const [{user}, dispatch] = useStateValue();

    const [input, setInput] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();

        

        db.collection("posts").add(

            {
                message: input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                profilePic: user.photoURL,
                username: user.displayName,
                image: imageUrl,
            }

        );

        // Some Clever DB stuff

        setInput("");
        setImageUrl("");
    };

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
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            message: input,
                            profilePic: user.photoURL,
                            username: user.displayName,
                            image: url,
                            
                            
                        });

                        console.log(url);

                        setProgress(0);
                        setInput("");
                        setImageUrl("");
                        setImage(null);
                    })
                }
        )    


    };

    const showUploader = () => {
        document.getElementsByClassName('messageSender__uploader')[0].classList.toggle('uploaderHide');
    }

    return (
        <div className="messageSender">
            
            <div className="messageSender__top">
                <Avatar src={user.photoURL} />

                <form>

                    <input 
                        value= {input}
                        onChange={ (e) => setInput(e.target.value) }
                        
                        placeholder={`Whats on your mind ${user.displayName} ?`}
                    />

                    <button disabled={!input} onClick={handleSubmit} type="submit">
                        POST
                    </button>
                </form>
            
            </div>

            <div className="messageSender__bottom">

                <div className="messageSender__options">
                    <VideocamIcon style={{color: "red"}} />
                    <h3>Live Video</h3>
                </div>
                <div className="messageSender__options insert-photo" onClick={showUploader}>
                <IconButton>
               
                <PhotoLibraryIcon style={{color: "green"}} />

                </IconButton>

                
                    <h3>Photo/Video</h3>
                </div>
                <div className="messageSender__options insert-emoticon">
                    <InsertEmoticonIcon style={{color: "orange"}} />
                    <h3>Feeling/Activity</h3>
                </div>
            
            </div>

            <div className="messageSender__uploader uploaderHide">
                <progress className="imageUpload__progress" value={progress} max="100" />
                <input className="uploader__input" type="file" onChange={handleChange}/>
                <Button className="uploader__button" onClick={handleUpload} variant="contained" color="green">
                Upload
                </Button>
            </div>

        </div>
    )
}

export default MessageSender;
