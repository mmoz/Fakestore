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
  const [cart, setCart] = useState([]);
  const [loadcart, setLoadcart] = useState(false);
  const [cartLength, setCartLength] = useState(0);
  const [loadingdes, setLoadingDes] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };
  const filteredData = searchText
    ? data.filter(
        (item) =>
          item.title &&
          item.title.toLowerCase().includes(searchText.toLowerCase())
      )
    : data;
  const handleFormReset = (e) => {
    e.preventDefault();
    setSearchText("");
  };

  return (
    loading && (
      <div className="App">
        <BrowserRouter>
          <Header
            loadcart={loadcart}
            cartLength={cartLength}
            setCartLength={setCartLength}
          />

          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <div className="mt-10">
                    <h1 className="text-center">Product</h1>
                    <div className="flex justify-end mr-[1.5vw] mt-[20px]">
                      <form className="form">
                        <div>
                          <svg
                            width="17"
                            height="16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            aria-labelledby="search"
                          >
                            <path
                              d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                              stroke="currentColor"
                              strokeWidth="1.333"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </div>
                        <input
                          className="input"
                          placeholder="Search Here!"
                          required=""
                          type="text"
                          onChange={handleSearch}
                          value={searchText}
                        />
                        <button className="" onClick={handleFormReset}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            ></path>
                          </svg>
                        </button>
                      </form>
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
