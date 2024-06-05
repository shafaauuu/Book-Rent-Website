import React from "react";
import { Link, Outlet } from "react-router-dom";
import { MdDashboardCustomize, MdOutlineDashboardCustomize,} from "react-icons/md";
import { FaLocationArrow, FaQuestionCircle, FaRegUser, FaUserFriends } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaBookReader } from "react-icons/fa";
import { FaPlusSquare } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import Login from "../components/Login";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const sharedLinks = (
  <>
    <li className="mt-3">
      <Link to="/">
        {" "}
        <MdOutlineDashboardCustomize />
        Home
      </Link>
    </li>
    <li>
        <Link to ="/menu"> <FaCartShopping/> Book Menu </Link>
    </li>
  </>
);

// import  later to do
// import logo from "/logo.png";

const DashboardLayout = () => {
  const { loading} = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin()
  return (
    <div>
      {
        isAdmin ?       <div className="drawer lg sm:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
          {/* Page content here */}
          <div className="flex items-center justify-between mx-4">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              <MdDashboardCustomize />
            </label>
            <button className="btn rounded-full px-6 bg-blue items-center gap-2 text-white sm:hidden ">
              <FaRegUser /> Log Out
            </button>
          </div>
          <div className="mt-5 md:mt-2 mx-4">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}

            <li>
              <Link to="/dashboard" className="flex justify-start mb-3">
                <a className="title " text-color="blue">
                  {" "}
                  Book Rent
                </a>
                <span className="badge badge-primary">Admin</span>
              </Link>
            </li>
            <hr />

            {/* <li className="mt-3">
              <Link to="/dashboard">
                {" "}
                <MdOutlineDashboardCustomize />
                Dashboard
              </Link>
            </li> */}
            <li>
              <Link to="/dashboard/manage-rental">
                <FaBookReader />
                Manage Bookings
              </Link>
            </li>
            <li>
              <Link to="/dashboard/add-menu">
                {" "}
                <FaPlusSquare />
                Add Book
              </Link>
            </li>
            <li>
              <Link to="/dashboard/users">
                {" "}
                <FaUserFriends /> Manage User
              </Link>
            </li>
            <li className="mb-3">
              <Link to="/dashboard/manage-items">
                {" "}
                <FaEdit />
                Manage Book Items
              </Link>
            </li>

            <hr/>

            {/* shaared nav links  */}
            {
                sharedLinks
            }
          </ul>
        </div>
      </div> : <Login/>
      }
    </div>
  );
};

export default DashboardLayout;
