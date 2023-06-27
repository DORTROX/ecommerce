import React, { useEffect } from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

import { getSession } from "next-auth/react";
import { useUserContext } from "@/context/UserSchema";
import { client } from "@/lib/client";


const Layout = ({ children }) => {
  const { user, setUser, setCartItems} = useUserContext();

  useEffect(() => {
    AOS.init();
    getSession().then(async (session) => {
      if (session == null) return;
      await axios
        .post("/api/userDb/UserInit", {
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
        })
        .then(async (Response) => {
          if (typeof Response.data != Boolean) {
            let cart = [];
            Response.data.cartItems?.map(async (item) => {
              let x = await client.fetch(`*[_type == "product" && slug.current == '${item.slug}'][0]`);
              if (x) {
                x.quantity = item.quantity;
                cart.push(x);
              } else {
                //Do nothings
              }
            });
            setCartItems(cart);
          }
          if (user.name == "Guest") {
            await setUser({
              ...user,
              id: Response.data._id,
              name: session.user.name,
              email: session.user.email,
              image: session.user.image,
              ordersHistory: Response.data.OrderHistory,
              City: Response.data.City,
              pinCode: Response.data.Postal_Code,
              shippingAddress: Response.data.Shipping_Address,
              phone: Response.data.phone,
              access: session.user.email == "creativewallsstudio@gmail.com"
            });
          }
        });
    });
  });

  return (
    <div className='main-layout'>
      <Head>
        <title>Creative Wallpapers</title>
        <meta
          name='description'
          content='Discover beautiful and high-quality wall coverings at Creative Wallpapers. Explore our wide range of designs, patterns, and textures to transform your space with style and creativity.'
        />
        <link rel='icon' type='image/png' href='/Images/CreativeWallpapers.png' />
        <meta property='og:title' content='Creative Wallpapers | High-Quality Wall Coverings' />
        <meta
          property='og:description'
          content='Discover beautiful and high-quality wall coverings at Creative Wallpapers. Explore our wide range of designs, patterns, and textures to transform your space with style and creativity.'
        />
        <meta
          property='og:image'
          content='/Images/CreativeWallpapers.png'
        />
        <meta property='og:url' content='/' />
      </Head>
      <header>
        <Navbar />
      </header>
      <main className='main-container'>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
