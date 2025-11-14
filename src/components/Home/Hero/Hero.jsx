import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
  },
  {
    id: 2,
    title: "Best Sneakers in Market",
    subtitle: "Grab Your Pair Now",
    img: img2,
  },
  {
    id: 3,
    title: "Trendy T-Shirts for Men",
    subtitle: "Starting at just ₹399",
    img: img3,
  },
];

const Hero = () => {
  return (
    <div className="hero-wrapper">
      <Swiper
        modules={[Autoplay,  Navigation]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        
        navigation
        speed={1500}   // ⭐ SUPER SMOOTH SCROLL
        className="hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="hero-slide">
              {/* Text Section */}
              <motion.div
                className="hero-content"
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <h2>{slide.subtitle}</h2>
                <h1>{slide.title}</h1>
                <motion.button whileHover={{ scale: 1.08 }}>
                  Shop Now
                </motion.button>
              </motion.div>

              {/* Image Section */}
              <motion.div
                className="hero-image"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
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
