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
  
  return (
    <div className="App">
     {/* <LoginPage/> */}
      <UpLoadimage/>
      {/* <Swiperjs/> */}
    </div>
  );
}

export default App;
