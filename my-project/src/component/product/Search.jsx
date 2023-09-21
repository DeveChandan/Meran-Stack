import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './produtDetails.css';

const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/product/${keyword}`);
    } else {
      navigate('/products');
    }
  };

  return (
    <>
      <div className="continer bgD">  
        <form className="flex justify-center items-center max-w-full w-[100vw] h-[80vh]" action="" onSubmit={searchSubmitHandler}>
          <input type="text" name="text" className="w-80 p-4 rounded-md outline-none shadow-xl" placeholder="Search a Product..." onChange={(e) => setKeyword(e.target.value)} />
          <input type="submit" className="shadow-xl p-4 rounded-md bg-green-500 cursor-pointer" value="Search" />
        </form>
      </div>
    </>
  );
};

export default Search;
