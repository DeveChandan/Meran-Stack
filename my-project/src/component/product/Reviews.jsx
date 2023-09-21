import ReactStars from 'react-rating-stars-component';
import profilePic from '../../assets/header/account.png';

const Reviews = ({review}) => {
    const ratingOptions = {
        edit: false,
        color: 'rgba(20, 20, 20, 0.1)',
        activeColor: 'tomato',
        size: window.innerWidth < 600 ? 20 : 25,
        value: review.rating,
        isHalf: true,
      };
    
  return (
    <div className="ReviewsCard reviews flex-col  items-center flex mt-5 p-4">
      <img src={profilePic} alt="User" />
      <p>{review.name}</p>
      <ReactStars  {...ratingOptions} />
     <p>{review.comment}</p>
    </div>
  )
}

export default Reviews
