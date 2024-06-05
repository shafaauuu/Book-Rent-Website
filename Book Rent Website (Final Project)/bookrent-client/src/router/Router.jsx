import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CartPage from "../pages/shop/CartPage";
import DashboardLayout from "../layout/DashboardLayout";

import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/admin/Users";
import AddMenu from "../pages/dashboard/admin/AddMenu";
import ManageItems from "../pages/dashboard/admin/ManageItems";
import UpdateMenu from "../pages/dashboard/admin/UpdateMenu";
import Checkout from "../pages/shop/Checkout";
import ManageRental from "../pages/dashboard/admin/ManageRental";
import UpdateTransaction from "../pages/dashboard/admin/UpdateTransaction";
import TransactionHistory from "../pages/shop/TransactionHistory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        // element : <PrivateRouter> <Menu/> </PrivateRouter> //change it later 
      },
      {
        path:"/cart-page",
        element:<CartPage/>
      },
      {
        path: "/update-profile",
        element: <UpdateProfile />,
      },
      {
        path: "/process-checkout",
        element: <Checkout/>,

      }, 
      {
        path: "transaction-history",
        element:<TransactionHistory/>
      }
      

      // Checkout
    ],
  },
  {
    path:"/signup",
    element:<SignUp/>
  },
  {
    path:"/login",
    element: <Login/>
  },

  // admin routes
  {
    path:'dashboard',
    element:<PrivateRouter><DashboardLayout/></PrivateRouter>,
    children : [
      {
        path:'',
        element:<Dashboard/>
      },
      {
        path:'users',
        element:<Users/>

      },
      {
        path:'add-menu',
        element:<AddMenu/>

      },
      {
        path:'manage-items',
        element:<ManageItems/>
      }, 
      {
        path:"update-menu/:id",
        element:<UpdateMenu/>,
        loader : ({params}) => fetch(`http://localhost:6001/menu/${params.id}`)

      }, 
      {
        path: "manage-rental",
        element:<ManageRental/>
      },
      {
        path: "update-transaction/:id",
        element: <UpdateTransaction />,
        loader: ({ params }) => fetch(`http://localhost:6001/transactions/${params.id}`).then((response) => response.json())
      }
      
    ]
  }
  

]);

export default router;
