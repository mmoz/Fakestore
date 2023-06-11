import { Link } from "react-router-dom";

const Product = ({ title, image, id, onIdChange, loading, handlePurchase }) => {
  //ส่งค่า id มาเก็บไว้และส่งออกไปให้ App Component เรียกใช้
  const handleIdChange = () => {
    onIdChange(id);
  };

  return loading ? (
    <div>
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
    </div>
  ) : (
    <div className="flex justify-center">
      <div className="loading flex justify-center">
        <svg viewBox=" 25 25 50 50">
          <circle r="20" cy="50" cx="50"></circle>
        </svg>
      </div>
    </div>
  );
};

export default Product;
