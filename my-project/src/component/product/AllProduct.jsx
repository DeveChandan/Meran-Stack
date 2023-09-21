import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { getAllProducts } from "../../actions/ProductAction";
import Loading from "../loder/Loading";
import "./produtDetails.css";
import Product from "../product/Product";
import { Slider, Typography } from "@mui/material";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FunnelIcon } from "@heroicons/react/20/solid";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Metadate from "../Metadate";
const AllProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { products, error, loading, productCount, resultPerPage } = useSelector(
    (state) => state.products
  );
  const [price, setPrice] = useState([0, 2500]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const keyword = id ? id.keyword : "";
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const alrt = toast();

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  useEffect(() => {
    dispatch(
      getAllProducts({
        keyword,
        currentPage,
        resultPerPage,
        price,
        category,
        ratings,
        error,
      })
    );
  }, [
    dispatch,
    keyword,
    currentPage,
    resultPerPage,
    price,
    category,
    ratings,
    error,
  ]);

  useEffect(() => {
    if (error) {
      alrt.error(error);
    }
  }, [error, alrt]);

  const pageCount = Math.ceil(productCount / resultPerPage);

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
    dispatch(
      getAllProducts({
        keyword,
        currentPage: 1,
        resultPerPage,
        price: newPrice,
        category,
        ratings,
      })
    );
  };

  const ratingsHandler = (event, newRatings) => {
    setRatings(newRatings);
    dispatch(
      getAllProducts({
        keyword,
        currentPage: 1,
        resultPerPage,
        price,
        category,
        ratings: newRatings,
      })
    );
  };

  const categoryHandler = (selectedCategory) => {
    setCategory(selectedCategory);
    dispatch(
      getAllProducts({
        keyword,
        currentPage: 1,
        resultPerPage,
        price,
        ratings,
        category: selectedCategory,
      })
    );
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);

    // If filter is closed, reset the filter values and fetch all products again
    if (isFilterOpen) {
      setPrice([0, 2500]);
      setCategory("");
      setRatings(0);
      dispatch(getAllProducts({ keyword, currentPage: 1, resultPerPage }));
    }
  };

  const categories = [
    "Pant-jens",
    "T-shirt",
    "Iphone",
    "Product Category",
    // Add more categories as needed
  ];

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Metadate title="PRODUCTS...ECOMMERC" />
          <div className="bgD">
            <div className="textContiner flex-col flex items-center justify-center">
              <h2 className="text-2xl font-bold border-b-2">Products</h2>
            </div>
            <div className="filter-toggle px-6 " onClick={toggleFilter}>
              {isFilterOpen ? (
                <XMarkIcon className="h-10 w-10 text-red-500 filter-icon" />
              ) : (
                <FunnelIcon className="h-10 w-10 text-purple-700 filter-icon" />
              )}
            </div>
            {isFilterOpen && (
              <div className="continer bg-transparent flex justify-center items-center">
                <div className="Filte sm:w-1/6 flex-col p-10 ">
                  <Typography className="text-center text-black">Price</Typography>
                  <Slider
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                    getAriaValueText={() => "rang-slider"}
                    min={0}
                    max={2500}
                    
                  />

                  <Typography className="pt-8 text-black font-bold text-lg text-center">
                    Category
                  </Typography>
                  <ul className="categoryBox cursor-pointer">
                    {categories.map((category) => (
                      <li
                        className="categoryLink p-1 text-black"
                        key={category}
                        onClick={() => categoryHandler(category)}
                      >
                        ⚈ {category}
                      </li>
                    ))}
                  </ul>
                  <fieldset>
                    <Typography className="pt-8 text-center text-black">
                      Ratings Above
                    </Typography>
                    <Slider
                      value={ratings}
                      onChange={ratingsHandler}
                      aria-labelledby="continous-slider"
                      min={0}
                      max={5}
                      valueLabelDisplay="auto"
                    />
                  </fieldset>
                </div>
              </div>
            )}
            <div className="product-container  flex flex-col justify-center items-center mt-5 space-x-6 sm:flex-wrap sm:flex-row m-1">
              {products.length > 0 ? (
                products
                  .slice(
                    (currentPage - 1) * resultPerPage,
                    currentPage * resultPerPage
                  )
                  .map((product) => (
                    <div
                      className="product bgp rounded-md w-64 mt-8"
                      key={product._id}
                    >
                      <Product product={product} />
                    </div>
                  ))
              ) : (
                <p>No products available.</p>
              )}
            </div>

            <div className="pagination">
              <ReactPaginate
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                initialPage={currentPage - 1}
                onPageChange={handlePageChange}
                nextLabel="Next"
                previousLabel="Prev"
                breakLabel="..."
                breakClassName="break-me"
                containerClassName="pagination-container"
                activeClassName="active"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
              />
            </div>
          </div>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </>
      )}
    </>
  );
};

export default AllProduct;
