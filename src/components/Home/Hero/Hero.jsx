import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import img1 from "../../../assets/img1.jpg";
import img2 from "../../../assets/img2.jpg";
import img3 from "../../../assets/img3.jpg";

import "./Hero.css";

const slides = [
  {
    id: 1,
    title: "New Winter Collection",
    subtitle: "Flat 40% OFF on all jackets",
    img: img1,
    link: "/winter-sale",
  },
  {
    id: 2,
    title: "Best Sneakers in Market",
    subtitle: "Grab Your Pair Now",
    img: img2,
    link: "/sneakers",
  },
  {
    id: 3,
    title: "Trendy T-Shirts for Men",
    subtitle: "Starting at just ₹399",
    img: img3,
    link: "/tshirts",
  },
];

const Hero = () => {
  return (
    <div className="hero-wrapper">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        navigation
        pagination={{ clickable: true }}
        speed={1200}
        className="hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="hero-slide">
              <div className="overlay"></div>

              {/* Text */}
              <motion.div
                className="hero-content"
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2 }}
              >
                <h3>{slide.subtitle}</h3>
                <h1>{slide.title}</h1>

                {/* Converted to Link */}
                <motion.div whileHover={{ scale: 1.08 }}>
                  <Link to={slide.link} className="hero-btn">
                    Shop Now
                  </Link>
                </motion.div>
              </motion.div>

              {/* Image */}
              <motion.div
                className="hero-image"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2 }}
              >
                <img src={slide.img} alt="Product Banner" />
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
