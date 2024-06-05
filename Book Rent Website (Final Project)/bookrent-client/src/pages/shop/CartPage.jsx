import React, { useContext } from "react";
import useCart from "../../hooks/useCart";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios"; // Import axios for making HTTP requests
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";

const calculatePrice = (item) => {
  return item.price * item.quantity;
};

const CartPage = () => {
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const handleCheckout = () => {
    if (user && user.email) {
      const checkoutItems = cart.map((item) => ({
        checkoutItemId: item._id,
        Title: item.Title,
        image: item.image,
        price: item.quantity * item.price,
        quantity: item.quantity,
        email: user.email,
        penalty: 0,
        status: "Unpaid",
        transaction_date: new Date().toISOString(),
      }));
  
      axios
        .post("http://localhost:6001/transactions", checkoutItems)
        .then((response) => {
          console.log(response);
          if (response) {
            // Delete items from the cart after successful checkout
            Promise.all(
              cart.map((item) =>
                fetch(`http://localhost:6001/carts/${item._id}`, {
                  method: "DELETE",
                })
              )
            )
            .then(() => {
              refetch();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Your Book has successfully Rent!!.",
                showConfirmButton: false,
                timer: 1500,
              }).then(() => {
                // Navigate to the process checkout page
                navigate("/process-checkout");
              });
            })
              .catch((error) =>
                console.error("Error while deleting items from the cart:", error)
              );
          }
        })
        .catch((error) => {
          console.error(error.response.data.message);
          const errorMessage = error.response.data.message;
          Swal.fire({
            position: "center",
            icon: "warning",
            title: `${errorMessage}`,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    }
  };
  


  // handle increase function
  const handleIncrease = (item) => {
    fetch(`http://localhost:6001/carts/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ quantity: item.quantity + 1 }),
    })
      .then((res) => res.json())
      .then(() => refetch())
      .catch((error) => console.error('Error while increasing quantity:', error));
  };

  // handle decrease function
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      fetch(`http://localhost:6001/carts/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ quantity: item.quantity - 1 }),
      })
        .then((res) => res.json())
        .then(() => refetch())
        .catch((error) => console.error('Error while decreasing quantity:', error));
    } else {
      alert("Item quantity cannot be zero");
    }
  };

  // handle delete items
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:6001/carts/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((error) => console.error('Error while deleting item:', error));
      }
    });
  };

  return (
    <div className="section-container">
      {/* banner */}
      <div className="bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-36 flex flex-col items-center justify-center gap-8">
          {/* texts */}
          <div className="px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Items added to <span className="text-blue">Cart</span>
            </h2>
          </div>
        </div>
      </div>

      {/* table for the cart */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-blue text-white rounded-sm">
            <tr>
              <th>#</th>
              <th>Book Cover</th>
              <th>Book Title</th>
              <th>Quantity</th>
              <th>Payment Method</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {cart.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.image} alt={item.Title} />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="font-medium">{item.Title}</td>
                <td>
                  <button
                    className="btn btn-xs"
                    onClick={() => handleDecrease(item)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    readOnly
                    className="w-10 mx-2 text-center overflow-hidden appearance-none"
                  />
                  <button
                    className="btn btn-xs px-2"
                    onClick={() => handleIncrease(item)}
                  >
                    +
                  </button>
                  
                </td>
                <td>cashier</td>
                <td>Rp. {calculatePrice(item).toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-ghost text-red btn-xs"
                    onClick={() => handleDelete(item)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* customer details */}
      <div className="my-12 flex flex-col md:flex-row justify-between items-start">
        <div className="md:w-1/2 space-y-3">
          <h3 className="font-medium">Customer Details</h3>
          <p>Name: {user.displayName}</p>
          <p>Email: {user.email}</p>
          <p>User_id: {user.uid}</p>
        </div>
        <div className="md:w-1/2 space-y-3">
          <h3 className="font-medium">Rent Details</h3>
          <p>Total Book: {cart.length}</p>
          <p>Total price: Rp. {cart.reduce((total, item) => total + calculatePrice(item), 0).toFixed(2)}</p>
          <p className="font-serif bg-red font-bold italic"> The Payment will be in chasier and you'll be pay when you return the  book</p>


          <button className="btn bg-blue text-white" onClick={handleCheckout}>
            RENT OUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

