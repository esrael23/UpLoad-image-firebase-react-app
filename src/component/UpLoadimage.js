import React from 'react'
// import './App.css';
import { Box, Button, Input, LinearProgress, Typography,Stack, Container, Card, CardHeader, TextField, ImageList, ImageListItem, Grid, CardActionArea, CardMedia, CardActions, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Alert, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
// import React from 'react';
import { deleteObject, getDownloadURL, listAll, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase/Firebase';
import { uuidv4 } from '@firebase/util';



const UpLoadimage = () => {


    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [imageList, setImageList] = useState([]);
    const imagelistRef = ref(storage, 'img/');
    const [imageTobeDelete, setImageTobeDelete] = useState("");
  
// dialog 

  const [openAl, setOpenAl] = React.useState(false);
  const [open, setOpen] = React.useState(false);


  const handleClickOpen = (url) => {
    setImageTobeDelete(url);
    setOpen(true);
  };

  // const handleClose = () => {
  //   setOpen(false);
  // };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);

    setOpenAl(false);
  };

  const deleteHandler = () => {
    const imageRef = ref(storage, imageTobeDelete)    
    deleteObject(imageRef).then((res) =>{
      setImageList(imageList.filter((img) => img.url !== imageTobeDelete))//
      setOpen(false);
      setOpenAl(true);
      setImageTobeDelete("")
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
      });
      setOpenAl(true)
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
    <div>
      <Container>
      <Typography variant="h6" color="primary" justifyContent={'center'} marginY={10}>admin gallery page</Typography>
      <Box marginBottom={10}>
        <TextField type='file' size='small' onChange={(e) =>{setImage(e.target.files[0])}} ></TextField>
        <Button onClick={uploadfile}>Up Load</Button>
        <Stack spacing={2} sx={{ flex: 1 }}>
          {
            progress !== 0 ?  (
              
              <LinearProgress determinate value={50} sx={{width: `${progress}%`}} />
            ) : null
          }

        </Stack>
       
      </Box>
      
      <Snackbar open={openAl} autoHideDuration={6000} onClose={handleClose}>
      <Alert severity="success">This is a success alert — check it out!</Alert>
      </Snackbar>
      <Container>
  
  <Grid container spacing={2} columnSpacing={2}>
    {imageList && imageList.map((fileobj, index) => (
      <Grid item xs={4} key={index}>
        <Card sx={{maxWidth: 345}} >
          <CardActionArea>
            <CardMedia
            height="200"
            component="img"
            image={`${fileobj.url}`}
            >
           
            </CardMedia>
            <CardActions>
              <Button variant='text'
              onClick={() => handleClickOpen(fileobj.url)}
               >
                delete
              </Button>
            </CardActions>
          </CardActionArea>

        </Card>


<Dialog
open={open}
onClose={handleClose}
aria-labelledby="alert-dialog-title"
aria-describedby="alert-dialog-description"
>
<DialogTitle id="alert-dialog-title">
  {"Use Google's location service?"}
</DialogTitle>
<DialogContent>
  <DialogContentText id="alert-dialog-description">
    Let Google help apps determine location. This means sending anonymous
    location data to Google, even when no apps are running.
  </DialogContentText>
</DialogContent>
<DialogActions>
  <Button onClick={handleClose}>Disagree</Button>
  <Button onClick={() => deleteHandler()} autoFocus>
    Agree
  </Button>
</DialogActions>
</Dialog> 

  </Grid>


    ))}
  </Grid>

        
      </Container>

            </Container>



            {/* dialog */}


           
    </div>
  )
}

export default UpLoadimage