import logo from './logo.svg';
import './App.css';
import { Box, Button, Input, LinearProgress, Typography,Stack, Container, Card, CardHeader, TextField, ImageList, ImageListItem, Grid, CardActionArea, CardMedia, CardActions } from '@mui/material';
import { useEffect, useState } from 'react';
import React from 'react';
import { deleteObject, getDownloadURL, listAll, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from './firebase/Firebase';
import { uuidv4 } from '@firebase/util';
import UpLoadimage from './component/UpLoadimage';
import LoginPage from './component/LoginPage';
import Swiper from './swiper/swiper';
import Swiperjs from './swiper/swiper';

function App() {

  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imageList, setImageList] = useState([]);
  const imagelistRef = ref(storage, 'img/')


 

  const deleteHandler = (ref, url) => {
    deleteObject(ref).then((res) =>{
      setImageList(imageList.filter((img) => img.url !== url))
      alert('seccessfully deleted')
    })

  }

 

  const uploadfile = () => {
    // console.log('up load image', image.name)
    if(image == null) return;

    const imageRef = ref(storage, `img/${image.name + uuidv4()}`)
    const upLoadFile = uploadBytesResumable(imageRef, image)

    upLoadFile.on("state_changed", (snapshot) =>{
      const progress = Math.round(snapshot.bytesTransferred/snapshot.
      totalBytes * 100);
      setProgress(progress)
    },(err) =>{

    }, () => {
      setProgress(0);
      getDownloadURL(upLoadFile.snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, {url: url, ref: uploadfile.snapshot.ref}])
      })
      alert('uploaded seccessfully ');

    }
    ) ;
    setImage(null)

  }
  // get dataaaa

  useEffect(() => {
    
      const getData = () => {
        listAll(imagelistRef).then((res) => {
          res.items.map((item) =>{
            getDownloadURL(item).then((url) =>{
              setImageList((prev) => [...prev, {url: url, ref: item}])
            })
          })

        })
      } 
    getData();
  }, [])

  
  return (
    <div className="App">
     {/* <LoginPage/> */}
      <UpLoadimage/>
      {/* <Swiperjs/> */}
    </div>
  );
}

export default App;
