import { Helmet } from 'react-helmet';

const Metadate = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
      {/* Add more metadata tags here */}
    </Helmet>
  );
};

export default Metadate;
