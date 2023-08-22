import * as React from 'react';
import Typography from '@mui/material/Typography';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import css from './Home.module.css';
import { Link } from 'react-router-dom';

import cont from './../../images/cont.jpg';
import log from './../../images/log.jpg';
import reg from './../../images/reg.jpg';

export const HomePage = () => {
  return (
    <div className={css.Wrap}>
      <Typography variant="h3" textAlign="center" style={{ color: '#1976d2' }}>
        Welcome to Phone book
      </Typography>

      <Typography
        variant="h4"
        textAlign="center"
        fontFamily="Dancing Script"
        style={{ color: '#1976d2' }}
      >
        fast to join, easy to use
      </Typography>

      <>
        <Swiper
          navigation={true}
          centeredSlides={true}
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          className={css.Swiper}
        >
          <SwiperSlide>
            <img src={reg} alt="item title" className={css.Img}></img>
            <p className={css.Subtitle}>Fast to signup</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src={log} alt="item title" className={css.Img}></img>
            <p className={css.Subtitle}>Quick to login</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src={cont} alt="item title" className={css.Img}></img>
            <p className={css.Subtitle}>Easy to use</p>
          </SwiperSlide>
        </Swiper>
      </>

      <Typography variant="h6" textAlign="center" style={{ color: '#1976d2' }}>
        Wanna try? Just <Link to="/registration">sign up</Link>
      </Typography>
      <Typography variant="h6" textAlign="center" style={{ color: '#1976d2' }}>
        Already with us? Just <Link to="/login">login</Link>
      </Typography>
    </div>
  );
};
