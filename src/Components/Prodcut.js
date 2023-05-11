import { Link } from "react-router-dom";
import { useState } from "react";

const Product = ({ title, image, id, onIdChange,price  }) => {
  const [cart, setCart] = useState([]);

  //ส่งค่า id มาเก็บไว้และส่งออกไปให้ App Component เรียกใช้
  const handleIdChange = () => {
    onIdChange(id);
  };
  const handlePurchase = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = { id, title, price, image };
  
    // Check if the item is already in the cart
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
  
    if (existingItem) {
      // If the item is already in the cart, update its quantity
      const updatedCart = cart.map((cartItem) => {
        if (cartItem.id === item.id) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    } else {
      // If the item is not in the cart, add it
      const updatedCart = [...cart, { ...item, quantity: 1 }];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
  };
  


  return (
    <div className="w-[250px] relative m-auto mt-5 border-2 h-[300px] flex flex-col justify-center items-center ">
      <div className="flex items-center justify-center  h-[150px] w-[100%] ">
        <img src={image} alt={title} className="w-[80px]"></img>
      </div>
      <div className="flex items-center justify-center border-b w-[100%] pb-[5px]  ">
        <h1
          className="text-sm max-w-[200px] truncate hover:tooltip cursor-pointer"
          data-tooltip={title}
        >
          {title}
        </h1>
      </div>
      <div className="flex justify-center mb-1  absolute bottom-5 text-white text-sm">
        <button
          className="mr-5  w-[70px] rounded-xl bg-[orange]"
          onClick={handlePurchase}

        >
          Purchase
        </button>
        <Link to={`/description/${id}`}>
          <button
            className=" w-[70px] rounded-xl bg-[orange]"
            onClick={handleIdChange}
          >
            More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Product;
