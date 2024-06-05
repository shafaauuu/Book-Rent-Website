import React, { useContext, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Swal from 'sweetalert2'

const Cards = ({ item }) => {
  const { Title, image, price, _id } = item;
  // console.log(item)
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  
  // console.log(user)

  // add to cart button
  const handleAddtoCart = (item) => {
    // console.log("button is click", item)
    if (user && user?.email) {
      const cartItem = { menuItemId: _id, Title, image, price, quantity:1, email: user.email
      };
      
      // console.log(cartItem)
      fetch("http://localhost:6001/carts",  {
        method: "POST",
        headers:{
          'content-type': "application/json"
        },
        body:JSON.stringify(cartItem)
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          if (data.insertedId) {
              Swal.fire({
                  position: "justify-center",
                  icon: "success",
                  title: "Your work has been saved",
                  showConfirmButton: false,
                  timer: 1500
              });
          }
      });
      
      
    } else{
      Swal.fire({
        title: "You cannot rent this book",
        text: "Please Log-in or create an account first!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login/Sign-up"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/signup', {state:{from:location}})
         
        }
      });

    }
  };

  // const handleHeartClick = () => {
  //   setIsHeartFilled(!isHeartFilled);
  // };
  return (
    <div
      to={`/menu/${item._id}`}
      className="card shadow-xl relative mr-5 md:my-5"
    >
      <div
        // className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-blue ${
        //   isHeartFilled ? "text-rose-500" : "text-white"
        // }`}
        // onClick={handleHeartClick}
      >
        {/* <FaHeart className="w-5 h-5 cursor-pointer" /> */}
      </div>
      <Link to={`http://localhost:6001/menu/${item._id}`}>
        <figure>
          <img
            src={item.image}
            alt="Shoes"
            className="hover:scale-105 transition-all duration-300 md:h-72"
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={`http://localhost:6001/menu/${item._id}`}>
          <h2 className="card-title">{item.Title}!</h2>
        </Link>
        <p className="font-semibold">Rating : {item.rating}</p>
        <p className="font-semibold">By : {item.author}</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-red">Rp. </span> {item.price}
          /Week</h5>
          <button
            className="btn bg-blue text-white"
            onClick={() => handleAddtoCart(item)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;


