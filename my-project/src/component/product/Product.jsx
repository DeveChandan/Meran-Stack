import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const ratingOptions = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  return (
    <Link className="product-card" to={product && `products/${product._id}`}>
      {product?.images?.length > 0 ? (
        <img src={product.images[0].url} alt={product.name} />
      ) : (
        <img src="" alt={product.name} />
      )}
      {product && <h2 className="text-1xl text-gray-500">{product.name}</h2>}
      <div className="flex items-center">
        <ReactStars {...ratingOptions} />
        {product && (
          <span className="rev">({product.numOfReviews}) reviews</span>
        )}
      </div>
      {product && (
        <h1 className="text-2xl text-red-500 font-bold">{`₹${product.price}`}</h1>
      )}
    </Link>
  );
};

export default Product;
