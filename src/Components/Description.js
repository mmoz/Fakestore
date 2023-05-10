const Description = ({ title, description, image, price ,loadingdes }) => {
  return (
    <>
    {loadingdes ? (
      <section className="flex justify-center">
      <div className="mt-[50px] h-auto border-2 max-w-[200px]">
        <div className="w-[96%] m-auto">
          <img src={image} />
        </div>
        <div className="text-center mt-[15px]">
          <div className="border-2">
            <h1>{title}</h1>
          </div>
          <div className="mt-[5px]">
            <h2>{description}</h2>
          </div>
          <h2 className="mt-[5px]">{price} USD</h2>
        </div>
        <div className="border-2 rounded w-fit m-auto mt-[10px]">
          <button>Purchase</button>
        </div>
      </div>
    </section>
    ):(<div><p>Loading</p></div>)   }
     </>

  );
};
export default Description;
