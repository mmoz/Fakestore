import "./App.css";
import Header from "./Components/Header";
import { useState, useEffect } from "react";
import Product from "./Components/Prodcut";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Description from "./Components/Description";


function App() {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(() => {
    const cachedData = localStorage.getItem("productData");
    return cachedData ? JSON.parse(cachedData) : [];
  });
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [description, setDescription] = useState([]);
  const [loadingdes,setLoadingdes] = useState(false);
  const [cart, setCart] = useState([]);


  

  //fetch API ของ ProductId ที่ถูกเลือก
  const fetchDes = async () => {
    setDescription({}); // or setDescription(null);
    const res = await fetch(
      `https://fakestoreapi.com/products/${selectedProductId}`
    );
    setLoadingdes(true)

    if (res.ok) {
      try {
        const data = await res.json();
        setDescription(data);
      } catch (error) {}
    } else {
      console.log(`Error: ${res.status} - ${res.statusText}`);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const convertData = await res.json();
        setData(convertData);
        localStorage.setItem("productData", JSON.stringify(convertData));
        setLoading(true);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    fetchDes();
    setLoadingdes(false)

   // eslint-disable-next-line
  }, [selectedProductId]);

  // เซ็ตค่า SelectedProductId ให้เท่ากับ id ที่ส่งมา
  const handleIdChange = (id) => {
    setSelectedProductId(id);
    localStorage.setItem("selectedProductId", id);
  };

  useEffect(() => {
    const cachedSelectedProductId = localStorage.getItem("selectedProductId");
    if (cachedSelectedProductId) {
      setSelectedProductId(cachedSelectedProductId);
    }
  }, []);

  return (
      <div className="App">
        <BrowserRouter>
          <Header cart={cart}/>

          <Routes>
            <Route
              path="/"
              element={loading ?(  <>
                <div className="mt-10">
                  <h1 className="text-center">Product</h1>
                </div>
                <div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 ">
                  {data &&
                    data.map((item) => (
                      <Product
                        key={item.id}
                        {...item}
                        onIdChange={handleIdChange}
                      />
                    ))}
                </div>
              </>):(<div className="flex justify-center"><span>..loading</span></div>)
              
              }
            ></Route>
            <Route path="/description/:selectedProductId"
              element={
                <Description
                  {...description}
                  key={description.id}
                  selectedProductId={selectedProductId}
                  setDescription={setDescription}
                  loadingdes={loadingdes}
                />
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
  )
}


export default App;
