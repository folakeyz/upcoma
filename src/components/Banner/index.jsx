import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import { useBanner } from "./hooks";
import styles from "./styles.module.css";
import img from "../../assets/images/backdrop.jpeg";

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
            <div
              className={styles.banner}
              style={{
                background: `linear-gradient(90deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.3)),url(${
                  item?.backdrop ? item?.backdrop : img
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
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
