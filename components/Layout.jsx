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
          .post("https://ecommerce-dortrox.vercel.app/api/userDb/UserInit", {
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
                id:  Response.data._id,
                name: session.user.name,
                email: session.user.email,
                phone: "",
                image: session.user.image,
              });
            }
          });
      });
  }, []);

  return (
    <div className='main-layout'>
      <Head>
        <title>Creative Wallpapers</title>
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
