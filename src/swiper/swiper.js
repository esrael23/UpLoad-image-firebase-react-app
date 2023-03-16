import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
// import 'swiper/css';
import 'swiper/swiper-bundle.min.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Box, Card } from '@mui/material';

const Swiperjs = () => {
  return (
    <div>
       <Swiper
       navigation
       pagination={{ clickable: true }}
       scrollbar={{ draggable: true }}
       
      modules={[Navigation, Pagination, Scrollbar]}
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      
      <SwiperSlide>
        <Box sx={{display:'flex', justifyContent:'center'}}>

         <Card sx={{height:'100px',paddingX: '50px'  }}>
          Pizza
        </Card>
        </Box>
        </SwiperSlide>
      <SwiperSlide>
      <Box sx={{display:'flex', justifyContent:'center'}}>

<Card sx={{height:'100px',paddingX: '50px'  }}>
tacos
</Card>
</Box>
      </SwiperSlide>
      <SwiperSlide>
      <Box sx={{display:'flex', justifyContent:'center'}}>

<Card sx={{height:'100px',paddingX: '50px'  }}>
burgers
</Card>
</Box>
      </SwiperSlide>
      <SwiperSlide>
      <Box sx={{display:'flex', justifyContent:'center'}}>

<Card sx={{height:'100px',paddingX: '50px'  }}>
pasta
</Card>
</Box>
      </SwiperSlide>
      
      ...
    </Swiper>
    </div>
  )
}

export default Swiperjs