import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import './App.css';
import img1 from './images/logo.png';
import Post from './Components/Post';
import { db, auth } from './firebase';
import ImageUploader from './ImageUpload';
import { Button, Input } from '@mui/material';
import InstagramEmbed from 'react-instagram-embed';
import { Box } from '@mui/system';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  height: '200px',
  backgroundColor: 'white',
  display: 'inline-grid',
  padding: '10px'
};

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    })

    return () => {
      // clean up before useeffect
      unsubscribe();
    }
  }, [user, username]);

  const signUp = (event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        })
      })
      .catch((error) => alert(error.message));
    setOpen(false);
  };

  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
  }

  useEffect(() => {
    db.collection('posts').orderBy('timeStamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data(),
      })))
    });
  }, [])

  return (
    <div className="App">
      <Modal
        open={open}
        onClose={() => setOpen(false)}>
        <form className='app__signup'>
          <center>
            <Box style={style}>
              {/* <div > */}
              <img
                style={{
                  height: '50px',
                  marginLeft: '125px'
                }}
                src={img1}
                alt="modalImg"
              >
              </img>
              <div
                style={{
                  display: 'inline-grid',
                }}
              >
                <Input
                  placeholder='Username'
                  type='text'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                  placeholder='Email'
                  type='text'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder='Password'
                  type='text'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button
                onClick={signUp}
              >Sign Up</Button>
            </Box>
          </center>
        </form>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}>
        <form className='app__signup'>
          <center>
            <Box style={style}>
              {/* <div > */}
              <img
                style={{
                  height: '50px',
                  marginLeft: '125px'
                }}
                src={img1}
                alt="modalImg"
              >
              </img>
              <div
                style={{
                  display: 'inline-grid',
                }}
              >
                <Input
                  placeholder='Email'
                  type='text'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder='Password'
                  type='text'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button
                onClick={signIn}
              >Login</Button>
            </Box>
          </center>
        </form>
      </Modal>
      <div className="app__header">
        <img
          className="app__headerImage"
          src={img1}
          alt=""
        />
        {user ? (
          <Button onClick={() => auth.signOut()}>Logout</Button>) : (
          <div className='app__loginContainer'>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          </div>
        )

        }
      </div>
      <div className='app__posts'>
        <div className='app_postsLeft'>
          {
            posts.map(({ id, post }) => (
              <Post key={id} postId={id}
                username={post.username}
                caption={post.caption}
                imageUrl={post.imageUrl}
                user={user}
                date={post.timeStamp}
              />
            ))
          }
        </div>
        <div className='app_postsRight'>
          <InstagramEmbed
            url="https://www.instagram.com/mickjagger/?utm_source=ig_embed&ig_rid=9477018e-b97f-4228-b42e-bbec3e9c7a12"
            clientAccessToken='123|456'
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => { }}
            onSuccess={() => { }}
            onAfterRender={() => { }}
            onFailure={() => { }}
          />
        </div>
      </div>
      {user?.displayName ? (
        <ImageUploader username={user.displayName} />
      ) : <h3>You must login to post</h3>}
    </div>
  );
}

export default App;

