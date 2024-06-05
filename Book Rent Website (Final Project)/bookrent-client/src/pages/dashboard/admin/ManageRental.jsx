import React from "react";
import useRental from "../../../hooks/useRental";
import { FaEdit, FaTrash, FaTrashAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageRental = () => {
  const [transaction, refetch] = useRental();
  const axiosSecure = useAxiosSecure()
  console.log(transaction);

  const handleDeleteTransaction = (item) => {
    // console.log(item);
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then( async (result) => {
        if (result.isConfirmed) {
            const res = await axiosSecure.delete(`http://localhost:6001/transactions/${item._id}`)
            refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
  }
  return ( 
    <div className="w-full md:w-[990px]  px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Manage All <span className="text-blue">Rent Transaction!</span>{" "}
      </h2>
      {/* menu item table  */}
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  Number
                </th>
                <th>Borrower's email</th>
                <th>Book Rent</th>
                <th>Payment</th>
                <th>Penalty</th>
                <th>Rent Date</th>
                <th>Return Date</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
                {
                    transaction.map((item, index) => (
                        <tr key = {index}>
                        <th>{index + 1}
                        </th>
                        <td>
                          <div className="flex items-center gap-3">
                      
                              
                              <td>{item.email}</td>
                            
                          </div>
                        </td>
                        <td>
                        {item.Title}
                        </td>
                        <td>Rp. {item.price}</td>
                        <td>Rp. {item.penalty}</td>
                        <td>{item.transaction_date}</td>
                        <td>{item.returnDate}</td>
                        <td>{item.status}</td>
                        <td>
                        <Link to={`/dashboard/update-transaction/${item._id}`}>
                        <button className="btn btn-ghost btn-xs bg-blue text-white">
                            <FaEdit />
                        </button>
                    </Link> 
                </td>
                        <td>
                          <button onClick={() => handleDeleteTransaction(item)} className="btn btn-ghost btn-xs"><FaTrashAlt/> </button>
                        </td>
                      </tr>


                    ))
                }
              {/* row 1 */}
             
              {/* row 2 */}

            </tbody>
          
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageRental;
