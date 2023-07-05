import axios from "axios";
import { useState, createContext, useContext } from "react";

const Context = createContext();

export const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    id: "",
    name: "Guest",
    email: "",
    phone: "",
    image: "",
    shippingAddress: "",
    City: "",
    pinCode: "",
    ordersHistory: [],
    access: false,
  });
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const successPayemnt = async (orderId, itemId, Buy = false) => {
    if (!Buy) {
      setTotalPrice(0);
      setCartItems([]);
    }
    await axios.post("/api/userDb/updateOrderHistory", {
      orderId: orderId,
      itemId: itemId,
      user,
    });
  };

  const onAdd = async (product, essentials) => {
    const checkProductInCart = cartItems.find(
      (item) =>
        item._id === product._id &&
        item.essentials.size.width === essentials.size.width &&
        item.essentials.size.height === essentials.size.height &&
        item.essentials.Name === essentials.Name
    );
    setTotalPrice((prevTotalPrice) => prevTotalPrice + essentials.total);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (
          cartProduct._id === product._id &&
          cartProduct.essentials.size.width === essentials.size.width &&
          cartProduct.essentials.size.height === essentials.size.height
        ) {
          return {
            ...cartProduct,
            quantity: cartProduct.essentials.quantity + essentials.quantity,
          };
        }
        return cartProduct; // Return the original cartProduct if not updating
      });
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, essentials }]);
    }

    await axios.post("/api/userDb/UpdateCart", {
      email: user.email,
      slug: product.slug.current,
      essentials: essentials,
    });
    return;
  };

  const onRemove = async (product, slug) => {
    try {
      let foundProduct = cartItems.find(
        (item) =>
          item._id === product._id &&
          item.essentials.size.width === product.essentials.size.width &&
          item.essentials.size.height === product.essentials.size.height &&
          item.essentials.Name === product.essentials.Name
      );
      const newCartItems = cartItems.filter(
        (i) =>
          i.essentials.size.width !== product.essentials.size.width ||
          i.essentials.size.height !== product.essentials.size.height ||
          i.essentials.total !== product.essentials.total
      );

      setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.essentials.total);
      setCartItems(newCartItems);
      await axios.post("/api/userDb/RemoveFromCart", {
        email: user.email,
        slug: slug,
        essentials: foundProduct
      })
    } catch (err) {
      console.log(err);
    }
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === "inc") {
      setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
      }
    }
  };

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
        cartItems,
        totalPrice,
        setCartItems,
        setTotalPrice,
        successPayemnt,
      }}>
      {children}
    </Context.Provider>
  );
};

export const useUserContext = () => useContext(Context);
