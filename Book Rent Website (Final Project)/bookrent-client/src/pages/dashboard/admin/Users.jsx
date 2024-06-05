import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaTrash, FaUser, FaUsers } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
("");

const Users = () => {
  const axiosSecure = useAxiosSecure()
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure('/users');
      return res.data;
    },
  });


  // console.log(users); // Log the fetched data instead of the component



  const handleMakeAdmin = user => {
    axiosSecure.patch(`/users/admin/${user._id}`).then( res => {
      alert(`${user.name} is now admin`)
      refetch();
    })




  }
  // syntax to delete user by admin in dashboard

  const handleDeleteUser = user => {
    axiosSecure.delete(`/users/${user._id}`).then(res => {
      alert(`${user.name} deleted from database`);
      refetch();
    });
  }
  
  return (
    <div>
      <div className="flex items-center justify-between m-4">
        <h5 >All User</h5>
        <h5 className="bg-blue rounded-md text-white">Total User: {users.length}</h5>

        {/* table */}
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra md:w-[870px]">
            {/* head */}
            <thead className="bg-blue text-white rounded-lg">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Telephone</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.telephone}</td>
                  <td>
                    {user.role === "admin" ? (
                      "Admin"
                    ) : (
                      <button onClick={() => handleMakeAdmin(user)} className="btn btn-xs btn-circle bg-blue text-white

                      ">
                        <FaUsers />{" "}
                      </button>
                    )}
                  </td>

                  <td>
                    <button onClick={() => handleDeleteUser(user)}
                      className="btn btn-xs bg-red text-white

                  "
                    >
                      {" "}
                      <FaTrash />
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

export default Users;
