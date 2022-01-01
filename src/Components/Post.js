import React, { useState, useEffect } from 'react'
import logo from '../images/logo.png'
import Avatar from '@mui/material/Avatar';
import firebase from "firebase";
import { onSnapshot } from 'firebase/firestore';
import './Post.css'
import { db } from '../firebase';

function Post({ postId, username, caption, imageUrl, user }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

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

            <h4 className="post__text"><b>{username}</b></h4>
            <div className='post__comments'>
                {comments.map((comment) => (
                    <p>
                        <strong>
                            {comment.username}
                        </strong>
                        {comment.text}
                    </p>
                ))

                }
            </div>
            <p className="post__text">{caption}</p>
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

        </div>
    )
}

export default Post
