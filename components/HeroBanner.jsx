import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button} from "@chakra-ui/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper";

const HeroBanner = () => {
  return (
    <>
      <Swiper
        style={{width:"100%"}}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "url(Images/VintageWallpaper.jpeg) 100% 100% / cover",
            backgroundSize: "cover",
          }}
        >
          <div className="eleme1">
            <h1>Vintage <span style={{color:"#BFA169"}}>Wallpapers</span></h1>
            <Button
              px={8}
              bg={"whiteAlpha.900"}
              color={"black"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              View More
            </Button>
          </div>
        </SwiperSlide>
        <SwiperSlide
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "url(Images/EmbroideryWallpaper.jpg) 0% 0% / cover",
            backgroundSize: "cover",
          }}
        >
          <div className="eleme1">
            <h1>Embroidered <span style={{color: "#F2B035"}}>Wallpapers</span></h1>
            <Button
              px={8}
              bg={"whiteAlpha.900"}
              color={"black"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              View More
            </Button>
          </div>
        </SwiperSlide>
        <SwiperSlide
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "url(Images/AbstractWallpaper.jpeg) 0% 0% / cover",
            backgroundSize: "cover",
          }}
        >
          <div className="eleme1">
            <h1>Abstract <span style={{color:"#F24B6A"}}>Wallpapers</span></h1>
            <Button
              px={8}
              bg={"whiteAlpha.900"}
              color={"black"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              View More
            </Button>
          </div>
        </SwiperSlide>
        <SwiperSlide
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "url(Images/Floral.jpeg) 0% 0% / cover",
            backgroundSize: "cover",
          }}
        >
          <div className="eleme1">
            <h1>Nature And Floral <span style={{color:"#F2F1DF"}}>Wallpapers</span></h1>
            <Button
              px={8}
              bg={"whiteAlpha.900"}
              color={"black"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              View More
            </Button>
          </div>
        </SwiperSlide>
        <SwiperSlide
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "url(Images/Geometry.jpeg) 30% 30% / cover",
            backgroundSize: "cover",
          }}
        >
          <div className="eleme1">
            <h1>Geometry <span style={{color: "#52F2C5"}}>Wallpaper</span></h1>
            <Button
              px={8}
              bg={"whiteAlpha.900"}
              color={"black"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              View More
            </Button>
          </div>
        </SwiperSlide>
        <SwiperSlide
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "url(Images/3dWall.jpeg) 30% 30% / cover",
            backgroundSize: "cover",
          }}
        >
          <div className="eleme1">
            <h1>3 dimensional <span style={{color: "#0FF207"}}>Wallpaper</span></h1>
            <Button
              px={8}
              bg={"whiteAlpha.900"}
              color={"black"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              View More 
            </Button>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default HeroBanner;
