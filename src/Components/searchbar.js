import { useRef } from "react";
const Searchbar = ({ onSearch, onReset }) => {
  const inputRef = useRef(null);

  const handleFormReset = (e) => {
    e.preventDefault();
    onReset();
    inputRef.current.value = ""; // Clear the input value
  };
  const handleFilterChange = (e) => {
    const searchText = e.target.value;
    onSearch(searchText);
  };
  return (
    <>
      <form className="form" onReset={handleFormReset}>
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
          ref={inputRef} // Add the ref to the input element
          className="input"
          placeholder="Search Here!"
          required=""
          type="text"
          onChange={handleFilterChange}
        />
        <button className="" type="reset">
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
    </>
  );
};
export default Searchbar;
