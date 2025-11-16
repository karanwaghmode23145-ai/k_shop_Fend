import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./NewArrivals.css";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5003/api/products?isFeatured=true")
      .then((res) => {
        setProducts(res.data.slice(0, 10));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="new-arrivals">
      <div className="container">

        {/* TITLE */}
        <div className="title-box">
          <h2 className="bg-title">New Arrivals</h2>
          <h2 className="main-title">New Arrivals</h2>
          <p className="sub-title">Browse the collection of top products</p>
        </div>

        {/* SLIDER */}
        <Swiper
          slidesPerView={4}
          spaceBetween={25}
          autoplay={{ delay: 2500 }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          breakpoints={{
            1200: { slidesPerView: 4 },
            992: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            480: { slidesPerView: 1 },
          }}
          className="arrival-slider"
        >
          {products.map((p) => (
            <SwiperSlide key={p._id}>
              <div className="product-card">
                <div className="img-box">
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    className="main-image"
                  />
                  {p.images?.[1] && (
                    <img
                      src={p.images[1]}
                      alt="hover"
                      className="hover-image"
                    />
                  )}
                  {p.discountPercent > 0 && (
                    <span className="badge">-{p.discountPercent}%</span>
                  )}
                </div>

                <div className="content">
                  <h4>{p.title}</h4>

                  {/* Rating */}
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={i < p.rating ? "fa fa-star" : "fa fa-star-o"}
                      ></i>
                    ))}
                  </div>

                  <div className="price">
                    {p.oldPrice && <span className="old">₹{p.oldPrice}</span>}
                    <span className="new">₹{p.price}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="shop-all">
          <a href="/collection">Shop All Collection</a>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
