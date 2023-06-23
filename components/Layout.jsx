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
  const { user, setUser, setCartItems } = useUserContext();

  useEffect(() => {
    AOS.init();
    getSession().then(async (session) => {
      if (session == null) return;
      await axios
        .post("https://www.creativewallpapers.work/api/userDb/UserInit", {
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
                //Do nothing
              }
            });
            await setCartItems(cart);
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
            });
          }
        });
    });
  }, []);

  return (
    <div className='main-layout'>
      <Head>
        <title>Creative Wallpapers</title>
        <meta property='og:title' content='Creative Wallpapers' />
        <meta property='og:description' content='Beautiful wall covering & much more' />
        <meta property='og:image' content='https://static.vecteezy.com/system/resources/previews/000/701/690/original/abstract-polygonal-banner-background-vector.jpg' />
        <meta property='og:url' content='https://www.creativewallpapers.work' />
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
