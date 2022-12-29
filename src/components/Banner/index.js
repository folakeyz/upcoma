import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import "swiper/css/bundle";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import { useBanner } from "./hooks";
import styles from "./styles.module.css";

const Banner = () => {
  const data = useBanner();
  return (
    <div>
      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 6000 }}
        loop={true}
        slidesPerView={1}
      >
        {data?.map((item, i) => (
          <SwiperSlide key={i}>
            <div className={styles.banner}>
              <h1>{item.title}</h1>
              <p>{item.text}</p>
              <br />
              {item.btn && (
                <div className="btnContainer">
                  <Link to="/#" className={`btn ${item.color}`}>
                    {item.btnTitle}
                  </Link>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
