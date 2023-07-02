import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useState } from "react";
import "./Header.css";
import Cart from "./Cart";
const Navbar = ({ loadcart, cartLength, setCartLength }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <nav className="h-[2.5rem] flex justify-between bg-[orange]">
        <ul className="flex justify-between w-[31.25rem] mt-[0.3125rem] ml-[3.75rem] text-white md:justify-evenly sm:ml-0">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            {" "}
            <Link to="/">Product</Link>
          </li>
          <li>about us</li>
        </ul>
        <div className="mt-[0.625rem] mr-[5vw] relative overflow-x-hidden">
          <button onClick={() => setShowModal(!showModal)}>
            <AiOutlineShoppingCart />
          </button>
          <div className="absolute top-[-30%] right-[20%]">
            <span className="text-sm ">{cartLength}</span>
          </div>
        </div>
        <div className={showModal ? "modal" : "hidden"}>
          <div className="flex justify-between">
            <h1>Product</h1>
            <button onClick={() => setShowModal(!showModal)}>X</button>
          </div>
          <Cart loadcart={loadcart} setCartLength={setCartLength} />
        </div>
      </nav>
    </>
  );
};
export default Navbar;
