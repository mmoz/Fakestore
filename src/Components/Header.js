import Headphone from "../images/Headphone.jpg";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useState } from "react";
import "./Header.css";
import Cart from "./Cart";

const Header = ({ loadcart, cartLength, setCartLength }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <header className="border-2 h-auto bg-[orange] sm:h-auto md:h-auto">
      <nav className="h-[2.5rem] flex justify-between">
        <ul className="flex justify-between w-[31.25rem] mt-[0.3125rem] ml-[3.75rem] text-white md:justify-evenly">
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
      </nav>
      <div className="flex justify-between w-[95vw] mt-[3.75rem] sm:items-center sm:ml-0 sm:flex-wrap md:flex-wrap md:items-center md:justify-center">
        <div className="max-w-[25rem]  mr-[3.75rem] order-2 sm:order-1 mt-5 sm:ml-20 ">
          <img
            src={Headphone}
            alt="Headphone"
            className="filter drop-shadow-md"
          />
          <div className="mt-5"></div>
        </div>
        <div className="ml-[3.75rem] order-1 text-white sm:order-2 sm:flex flex-col justify-center sm:ml-10 md:order-2">
          <div className="text-left text-[2rem]">
            <h1>Buy Best product From</h1>
            <h1>All Of The World</h1>
          </div>

          <div className="mt-10 text-left ">
            <span>
              Tempor cupidatat aliqua laboris quis ullamco fugiat est duis dolor
            </span>
            <p className="text-sm text-left">
              Minim deserunt quis fugiat commodo sunt deserunt veniam occaecat.
            </p>
          </div>

          <div className="flex mb-[1.875rem] mt-20 sm:justify-center sm:mr-5">
            <button className="mr-5 bg-white rounded-3xl w-[6.25rem] text-[orange]">
              Purchase
            </button>
            <button className="mr-5  rounded-3xl w-[6.25rem] text-white bg-transparent border-2  ">
              More
            </button>
          </div>
        </div>
        <div className={showModal ? "modal" : "hidden"}>
          <div className="flex justify-between">
            <h1>Product</h1>
            <button onClick={() => setShowModal(!showModal)}>X</button>
          </div>

          <Cart loadcart={loadcart} setCartLength={setCartLength} />
        </div>
      </div>
    </header>
  );
};
export default Header;
