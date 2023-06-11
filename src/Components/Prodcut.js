import { Link } from "react-router-dom";
import './product.css'

const Product = ({ title, image, id, onIdChange, loading, handlePurchase }) => {
  //ส่งค่า id มาเก็บไว้และส่งออกไปให้ App Component เรียกใช้
  const handleIdChange = () => {
    onIdChange(id);
  };

  return (
    <div className="w-[250px] relative m-auto mt-5  h-[300px] flex flex-col justify-center items-center overflow-x-hidden ">
      <div className="flex items-center justify-center  h-[150px] w-[96vw] ">
        <img src={image} alt={title} className="w-[80px]"></img>
      </div>
      <div className="flex items-center justify-center  w-[95vw] pb-[5px]  ">
        <h1
          className="text-sm max-w-[200px] truncate hover:tooltip cursor-pointer"
          data-tooltip={title}
        >
          {title}
        </h1>
      </div>
      <div className="flex justify-center mb-1  absolute bottom-1 text-white text-sm">
        <button
          className="mr-5  w-[70px] rounded-xl bg-[orange]"
          onClick={handlePurchase}
        >
          Purchase
        </button>
        <Link to={`/description/${id}`}>
          <button className="btn rounded-xl" onClick={handleIdChange}>
            <div>
              <span>
                <p className="text-black">More</p>
              </span>
            </div>
            <div>
              <span>
                <p className="text-white">Details</p>
              </span>
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Product;
