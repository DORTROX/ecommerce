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

  const successPayemnt = async (orderId, itemId) => {
    setTotalPrice(0)
    setCartItems([])
    await axios.post('/api/userDb/updateOrderHistory', {
      orderId: orderId,
      itemId: itemId,
      user
    })
  }

  const onAdd = async (product, quantity, slug) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
  
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        }
        return cartProduct; // Return the original cartProduct if not updating
      });
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
  
    await axios.post('/api/userDb/UpdateCart', {
      email: user.email,
      slug: slug,
      quantity: quantity,
    });
    return;
  };
  

  const onRemove = async (product, slug) => {
    try {
      let foundProduct = cartItems.find((item) => item._id === product._id);
      const newCartItems = cartItems.filter((item) => item._id !== product._id);

      setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
      setCartItems(newCartItems);
      await axios.post('/api/userDb/RemoveFromCart', {
        email: user.email,
        slug: slug,
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
        successPayemnt
      }}>
      {children}
    </Context.Provider>
  );
};

export const useUserContext = () => useContext(Context);
