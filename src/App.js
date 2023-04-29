import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Header";
import { useState, useEffect } from "react";
import Product from "./Components/Prodcut";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Description from "./Components/Description";

function App() {
    const [data, setData] = useState(() => {
      const cachedData = localStorage.getItem("productData");
      return cachedData ? JSON.parse(cachedData) : [];
    });
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [description, setDescription] = useState([]);

  const fetchData = async () => {
     const cachedData = localStorage.getItem("products");
     if (cachedData) {
       setData(JSON.parse(cachedData));
     } else {
       const res = await fetch("https://fakestoreapi.com/products");
       const convertData = await res.json();
       setData(convertData);
       localStorage.setItem("products", JSON.stringify(convertData));
     }
  };

 const fetchDes = async () => {
   const res = await fetch(
     `https://fakestoreapi.com/products/${selectedProductId}`
   );
   if (res.ok) {
     const data = await res.json();
     setDescription(data);
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
     } catch (error) {
       console.error(error);
     }
   }
   fetchData();
 }, []);

  useEffect(() => {
    fetchDes();
  }, [selectedProductId]);

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
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
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
              </>
            }
          ></Route>
          <Route
            path="/description/:selectedProductId"
            element={<Description key={description.id} {...description} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
