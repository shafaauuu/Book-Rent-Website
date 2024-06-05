import React from "react";
import useMenu from "../../../hooks/useMenu";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";

const ManageItems = () => {
  const [menu, refetch] = useMenu();
  const axiosSecure = useAxiosSecure();
  console.log(menu);
  

//   delete item function 
  const handleDeleteItem = async (item) => {
    // console.log(item);
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async (result) => {
        if (result.isConfirmed) {
            const res = await axiosSecure.delete(`/menu/${item._id}`);
           if(res){
            refetch(); // Call refetch after deletion
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
           }
        }
      });
  };

  return (
    <div className="w-full md:w-[870px]  px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Manage all <span className="text-blue">Book Items</span>{" "}
      </h2>

      {/* menu item */}
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image </th>
                <th>Title</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Category</th>
                <th>Author</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {menu.map((item, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={item.image} alt="Book Cover" />
                        </div>
                      </div>
                      <div></div>
                    </div>
                  </td>
                  <td>{item.Title}</td>
                  <td>Rp. {item.price}</td>
                  <td>{item.rating} /5</td>
                  <td>{item.category}</td>
                  <td>{item.author}</td>
                  <td>
                    <Link to={`/dashboard/update-menu/${item._id}`}>
                      <button className="btn btn-ghost btn-xs bg-blue text-white">
                        <FaEdit />
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteItem(item)}
                      className="btn btn-ghost btn-xs"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageItems;
