import React from 'react'
import logo from '../images/logo.png'
import Avatar from '@mui/material/Avatar';
import './Post.css'

function Post({ username, caption, imageUrl }) {
    return (
        <div className='post'>
            <div className='post__header'>
                <Avatar
                    className='post__avatar'
                    alt='Alt Name'
                />
                <h3>{username}</h3>
            </div>
            {/* header => avatar + username */}


            <img className='post__image' src={imageUrl} alt='img'></img>
            {/* image */}


            <h4 className="post__text"><b>{username}</b></h4>
            <p className="post__text">{caption}</p>
            {/* username + caption */}

        </div>
    )
}

export default Post
