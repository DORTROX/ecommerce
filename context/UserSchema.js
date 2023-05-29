import axios from "axios";
import { useState, createContext, useContext } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    id: "",
    name: "Guest",
    email: "",
    phone: "",
    image: "",
  });
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);

  const onAdd = async (product, quantity, slug) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
  
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
  
    await axios.post('https://e-commerce-next-js-livid.vercel.app/api/userDb/UpdateCart', {
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
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
      setCartItems(newCartItems);
      await axios.post('https://e-commerce-next-js-livid.vercel.app/api/userDb/RemoveFromCart', {
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
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
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
        totalQuantities,
        setCartItems,
      }}>
      {children}
    </Context.Provider>
  );
};

export const useUserContext = () => useContext(Context);
