import React, { useState, useEffect } from 'react'
import logo from '../images/logo.png'
import Avatar from '@mui/material/Avatar';
import firebase from "firebase";
import { onSnapshot } from 'firebase/firestore';
import './Post.css'
import { db } from '../firebase';

function Post({ postId, username, caption, imageUrl, user, date }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    function postedAgo() {
        const timeDifference = (Date.now() / 1000) - date.seconds;
        if (date) {
            if (timeDifference <= 59) {
                return <p>New!</p>;
            } else if (timeDifference <= 3599) {
                return <p>Posted {Math.round((timeDifference / 60))} minutes ago</p>;
            } else if (timeDifference <= 86399) {
                return <p>Posted {Math.round((timeDifference / 60) / 60)} hours ago</p>;
            } else if (timeDifference > 86399) {
                return <p>Posted {Math.round(((timeDifference / 60) / 60) / 24)} days ago</p>;
            }
        }
        return <p>New!</p>;
    }

    const postComment = (event) => {
        event.preventDefault();

        db
            .collection("posts")
            .doc(postId)
            .collection("comments").add({
                text: comment,
                username: user.displayName,
                timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
    }

    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy('timeStamp', 'desc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
                })
        }
        return () => {
            unsubscribe();
        }
    }, [postId])

    return (
        <div className='post'>
            <div className='post__header'>
                <Avatar
                    className='post__avatar'
                    alt='Alt Name'
                />
                <h3>{username}</h3>
            </div>
            <img className='post__image' src={imageUrl} alt='img'></img>
            <h4 className="post__text"><b>{username} </b></h4>
            <p className="post__text">{caption}</p>
            <div className='post__comments'>
                {comments.map((comment) => (
                    <p className='post__singleComment'>
                        <strong>
                            {comment.username} </strong>
                        {comment.text}
                    </p>
                ))

                }
            </div>

            <form>
                <input
                    className='post__input'
                    type="text"
                    placeholder='Add a comment'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button className='post__button'
                    disabled={!comment}
                    type="submit"
                    onClick={postComment}
                >
                    Post
                </button>
            </form>

            <p>{postedAgo()}</p>
        </div>
    )
}

export default Post
