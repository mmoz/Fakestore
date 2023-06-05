import { useState, useEffect } from "react";

const Cart = ({ loadcart, setCartLength }) => {
  const [cart, setCart] = useState([]);
  const [ ,setNumber] = useState("");

  //อัพเดทตะกร้าสินค้า
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, [loadcart]);

  //ลบสินค้า
  const removeItemFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };
  //เมื่อมีการลบสินค้าออกจากตะกร้าให้ลบจำนวนสินค้าที่ถูกลบออกไป
  useEffect(() => {
    const totalQuantity = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartLength(totalQuantity);
  }, [cart, setCartLength]);
  //เพิ่มสินค้า
  const increaseQuantity = (itemId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    const totalQuantity = updatedCart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartLength(totalQuantity);
  };
  //ลดสินค้า
  const decreaseQuantity = (itemId) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === itemId) {
          const newQuantity = item.quantity - 1;
          if (newQuantity === 0) {
            removeItemFromCart(itemId);
            return null;
          } else {
            return {
              ...item,
              quantity: newQuantity,
            };
          }
        }
        return item;
      })
      .filter(Boolean);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart, () => {
      const totalQuantity = updatedCart.reduce(
        (total, item) => total + item.quantity,
        0
      );
      setCartLength(totalQuantity);
    });
  };

  return (
    <div>
      <ul>
        {cart.map((item, index) => (
          <li key={index} className="flex justify-evenly border-2 h-[120px]">
            <div className="flex justify-center items-center w-[15px]">
              {item.id}
            </div>
            <div className="flex justify-center items-center">
              <img src={item.image} alt="cartimg" className="w-[5vw] object-fit" />
            </div>
            <div className="flex justify-center items-center">
              <button onClick={() => increaseQuantity(item.id)}>+</button>
            </div>
            <div className="flex justify-center items-center ">
              <input
                type="text"
                value={item.quantity}
                onChange={(e) => setNumber(e.target.value)}
                className="w-[45px] border-2 border-solid"
              />
            </div>
            <div className="flex justify-center items-center">
              <button onClick={() => decreaseQuantity(item.id)}>-</button>
            </div>
            <div className="flex justify-center items-center w-[60px]">
              {item.name} - ${item.price}
            </div>
            <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
