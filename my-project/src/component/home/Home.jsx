import { useEffect } from 'react';
import Metadata from '../Metadate';
import Product from '../product/Product';
import './home.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../actions/ProductAction';
import Loading from '../loder/loading';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Home = () => {
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector(({ products }) => products);

  useEffect(() => {
    if (error) {
      toast.error(error);
    } else  {
      dispatch(getAllProducts({ keyword: '' },)); // Pass keyword as an object property
    }
  }, [dispatch, error,]);
 
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="home bgD">
          <Metadata title='My-Ecommerce' />
          <div className="text-container p-6">
            <h1 className="text">Discover Endless Possibilities: Shop Our Exclusive Collection</h1>
          </div>
          <div className="button flex justify-center items-center">
            <button className="bg-pink-600 text-white rounded-md p-2 hover:bg-pink-400">Learn More</button>
          </div>
          <div className="product-container flex flex-col justify-center items-center mt-5 space-x-6 sm:flex-wrap sm:flex-row m-1">
  {products.length && products.map((product) => (
    <div className="product bgp rounded-md w-64 mt-8" key={product._id}>
      <Product product={product} />
    </div>
  ))}
  {!products.length && <p>No products available.</p>}
</div>

          <div className="button flex justify-center items-center">
            <button className="bg-pink-600 text-white rounded-md p-2 mt-5 hover:bg-pink-400">View Product</button>
          </div>
        </div>
      )} 
    </>
  );
};

export default Home;