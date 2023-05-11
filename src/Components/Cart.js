import { useState,useEffect} from 'react';

const Cart = () => {

    const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, [cart]);

  



  const removeItemFromCart = (item) => {
    const newCart = cart.filter((cartItem) => cartItem.id !== item.id);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cart.map((item,index) => (
          <li key={index} className='flex justify-evenly border-2 h-[10vh] overflow-auto'>
            <span>{item.id}</span>
            <img src={item.image} className='w-[5vw]'/>
            {item.name} - ${item.price}
            <button onClick={() => removeItemFromCart(item)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
