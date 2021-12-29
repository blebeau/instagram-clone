import React, { useState, useEffect } from 'react';
import './App.css';
import img1 from './images/logo.png';
import Post from './Components/Post';
import { db } from './firebase';


// const photo = require('/public/Screen Shot 2021-11-23 at 6.46.35 PM.png');

function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      console.log('snapshot', snapshot);
      setPosts(snapshot.docs.map(doc => doc.data()))
    });
  }, [])

  return (
    <div className="App">

      <div className="app__header">
        <img
          className="app__headerImage"

          src={img1}
          alt=""
        ></img>

      </div>

      {/* Header */}

      <h1>Hello Let's build IG</h1>

      {
        posts.map(post =>
          <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        )
      }

      {/* <Post username="Name 1" caption="caption 1" imageUrl={img1} />
      <Post username="Name 2" caption="caption 2" imageUrl="https://upload.wikimedia.org/wikipedia/commons/3/34/Ezra_Meeker_1921_crop.jpg" />
      <Post username="Name 3" caption="caption 3" imageUrl={img1} /> */}

    </div>
  );
}

export default App;

