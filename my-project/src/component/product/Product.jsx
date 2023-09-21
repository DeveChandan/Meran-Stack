import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  const Option = {
    edit: false,
    color: 'rgba(20, 20, 20, 0.1)',
    activeColor: 'tomato',
    size: window.innerWidth <600?20:25,
    value: 2.5,
    isHaif:true,
  };

  return (
    <Link className="ProductCard" to={`/${product._id}`}>
      <img src={product.image[0].url} alt={product.name} />
      <h2 className="text-1xl text-gray-500">{product.name}</h2>
      <div>
        <ReactStars {...Option} />
        <span>#####1</span>
      </div>
      <h1 className="text-2xl text-red-500 font-bold">{product.price}</h1>
    </Link>
  );
};

export default Product;
