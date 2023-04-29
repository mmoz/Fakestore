import Pokemon from "../images/Pokemon.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-2 h-[80vh] bg-[orange] sm:h-[150vh] md:h-[130vh]">
      <nav className="h-[40px]">
        <ul className="flex justify-evenly items-center mt-[5px] text-white">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            {" "}
            <Link to="/">Product</Link>
          </li>
          <li>about us</li>
        </ul>
      </nav>
      <div className="flex justify-between w-[100%] mt-[60px] sm:items-center sm:ml-0 sm:flex-wrap md:flex-wrap md:items-center md:justify-center">
        <div className="max-w-[400px]  mr-[60px] order-2 sm:order-1 mt-5 sm:ml-20 ">
          <img src={Pokemon} alt="pokemon" />
          <div className="mt-5"></div>
        </div>
        <div className="ml-[60px] order-1 text-white sm:order-2 sm:flex flex-col justify-center sm:ml-10 md:order-2">
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

          <div className="flex mb-[30px] mt-20 sm:justify-center sm:mr-5">
            <button className="mr-5 bg-white rounded-3xl w-[100px] text-[orange]">
              Purchase
            </button>
            <button className="mr-5 bg-transparent rounded-3xl w-[100px] text-white bg-transparent border-2  ">
              More
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
