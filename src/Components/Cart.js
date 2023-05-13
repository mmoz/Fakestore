import { useState, useEffect } from "react";

const Cart = ({ loadcart, setCartLength }) => {
  const [cart, setCart] = useState([]);

  //อัพเดทตะกร้าสินค้า
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, [loadcart]);

  //ลบสินึ้า
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

  return (
    <div>
      <ul>
        {cart.map((item, index) => (
          <li
            key={index}
            className="flex justify-evenly border-2 h-[10vh] overflow-auto"
          >
            <span>{item.id}</span>
            <img src={item.image} className="w-[5vw]" />
            {item.quantity}
            {item.name} - ${item.price}
            <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
