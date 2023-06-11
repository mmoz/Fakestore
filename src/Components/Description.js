import "./Description.css";
import Zoom from "react-img-zoom";

const Description = ({
  title,
  description,
  image,
  price,
  loadingdes,
  handlePurchase,
}) => {
  return (
    <div>
      {loadingdes ? (
        <section className="flex justify-center mt-[50px] flex-wrap sm:w-[40vw] sm:m-auto sm:mt-[20px] h-[80vw]">
          <div className="w-[20vw] ">
            <img src={image} alt="images" />
          </div>
          <div className=" w-[20vw] sm:w-[80vw]">
            <div className="flex justify-center pt-[10px] text-[1.5rem] text-center ">
              <h1>{title}</h1>
            </div>
            <div className="flex justify-center text-[1.3rem] border-b">
              <h1> {price} USD</h1>
            </div>
            <div className="mt-[10px] pl-[10px] flex justify-center border-b pb-[10px]">
              <div className="text-center">
                <h1 className="bold">Description</h1>
                <div className="text-left sm:text-center">
                  <h2>{description}</h2>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-[10px] btn">
              <button className="btn-cart" onClick={handlePurchase}>
                Add to cart
              </button>
            </div>
          </div>
        </section>
      ) : (
        <div className="loading flex justify-center">
          <svg viewBox=" 25 25 50 50">
            <circle r="20" cy="50" cx="50"></circle>
          </svg>
        </div>
      )}
    </div>
  );
};
export default Description;
