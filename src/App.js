import "./App.css";
import Header from "./Components/Header";
import { useState, useEffect } from "react";
import Product from "./Components/Prodcut";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Description from "./Components/Description";
import Searchbar from "./Components/searchbar";
import Navbar from "./Components/Navbar";

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(() => {
    const cachedData = localStorage.getItem("productData");
    return cachedData ? JSON.parse(cachedData) : [];
  });
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [description, setDescription] = useState([]);
  const [cart, setCart] = useState([]);
  const [loadcart, setLoadcart] = useState(false);
  const [cartLength, setCartLength] = useState(0);
  const [loadingdes, setLoadingDes] = useState(false);
  const [filteredData, setFilteredData] = useState(data);

  const handlePurchase = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the item is already in the cart
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      // If the item is already in the cart, update its quantity
      const updatedCart = cart.map((cartItem) => {
        if (cartItem.id === item.id) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    } else {
      // If the item is not in the cart, add it
      const updatedCart = [...cart, { ...item, quantity: 1 }];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
    //หลังจากเพิ่มสินค้าในตะกร้าให้มาเปลี่ยนแปลงค่าใน state cart เพื่อ ให้ state cart ส่งไปใช้ update ค่าใน useEffect ของ Component Class
    setLoadcart(!loadcart);
    //จำนวนสินค้า
    setCartLength(cart.length);
  };
  //จำนวนสินค้าเดิมที่มีอยู่ในตะกร้าแล้วกดเพิ่มจะถูกนับเพิ่ม
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQuantity = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartLength(totalQuantity);
  }, [cart]);

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

  useEffect(
    () => {
      //fetch API ของ ProductId ที่ถูกเลือก
      const fetchDes = async () => {
        setLoadingDes(false);
        setDescription({}); // or setDescription(null);
        const res = await fetch(
          `https://fakestoreapi.com/products/${selectedProductId}`
        );
        if (res.ok) {
          try {
            const data = await res.json();
            setDescription(data);
            setLoadingDes(true);
          } catch (error) {}
        } else {
          console.log(`Error: ${res.status} - ${res.statusText}`);
        }
      };

      fetchDes();
    },
    [selectedProductId],
    []
  );

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

  const handleSearch = (filterText) => {
    const filteredResults = data.filter((item) =>
      item.title.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredData(filteredResults);
  };
  const handleReset = () => {
    setFilteredData(data);
  };

  return (
    loading && (
      <div className="App">
        <BrowserRouter>
          <Navbar
            cartLength={cartLength}
            loadcart={loadcart}
            setCartLength={setCartLength}
          />

          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <Header
                    // loadcart={loadcart}
                    // cartLength={cartLength}
                    // setCartLength={setCartLength}
                  />
                  <div className="mt-10">
                    <h1 className="text-center">Product</h1>
                    <div className="flex justify-end mr-[1.5vw] mt-[20px]">
                      <Searchbar
                        onSearch={handleSearch}
                        onReset={handleReset}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 ">
                    {filteredData &&
                      filteredData.map((item) => (
                        <Product
                          key={item.id}
                          {...item}
                          onIdChange={handleIdChange}
                          handlePurchase={() => handlePurchase(item)}
                        />
                      ))}
                  </div>
                </div>
              }
            ></Route>
            <Route
              path="/description/:selectedProductId"
              element={
                <Description
                  {...description}
                  key={description.id}
                  selectedProductId={selectedProductId}
                  setDescription={setDescription}
                  handlePurchase={() => handlePurchase(description)}
                  loadingdes={loadingdes}
                />
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    )
  );
}

export default App;
