// import React, { useContext } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import Modal from "./Modal";
// import { AuthContext } from "../context/AuthProvider";
// import axios from "axios";


// // const SignUp = () => {
// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors },
// //   } = useForm();

// //   const {createUser, login} = useContext(AuthContext);
// //     // redirecting to home page or specifig page
// //     const location = useLocation();
// //     const navigate = useNavigate();
  
// //     const from = location.state?.from?.pathname || "/";

// //   const onSubmit = (data) => {
// //     const email = data.email;
// //     const password = data.password;
// //     createUser(email, password).then((result) => {
// //       // Signed up 
// //       const user = result.user;
// //       alert("account created successfully");
// //       navigate(from, {replace: true})
// //       document.getElementById("my_modal_5").close()
// //     })
// //     .catch((error) => {
// //       const errorCode = error.code;
// //       const errorMessage = error.message;
// //       // ..
// //     });
// //   }

// //   return (
// //     <div className="max-w-md bg-white shadow w-full mx-auto flex items center justify-center my-20">
// //       <div className="modal-actio mt-0">
// //         {/* Close button */}


// //         {/* Form */}
// //         <form
// //           onSubmit={handleSubmit(onSubmit)}
// //           className="card-body"
// //           method="dialog"
// //         >
// //           <h1 className="font-bold text-lg">
// //             Create A Account!
// //           </h1>
          

// //           {/* email */}
// //           <div className="form-control">
// //             <label className="label">
// //               <span className="label-text">Email</span>
// //             </label>
// //             <input
// //               type="email"
// //               placeholder="email"
// //               className="input input-bordered"
// //               {...register("email")}
// //             />
// //           </div>

// //           {/* password */}
// //           <div className="form-control">
// //             <label className="label">
// //               <span className="label-text">Password</span>
// //             </label>
// //             <input
// //               type="password"
// //               placeholder="password"
// //               className="input input-bordered"
// //               {...register("password")}
// //             />
// //             <label className="label mt-1">
// //               <a href="#" className="label-text-alt link link-hover">
// //                 Forgot password?
// //               </a>
// //             </label>
// //           </div>
// //           {/* error text */}

// //           {/* login button  */}
// //           <div className="form-control mt-6">
// //             <input type="submit" value="Sign Up" className="btn btn-primary" />
// //           </div>

// //           <p className="text-center my-2">
// //            Already have Acount?{" "}
// //             <button to="/signup" className="underline text-red ml-1"
// //             onClick={() => document.getElementById("my_modal_5").showModal()}
// //             >
// //               Log in
// //             </button>{" "}
// //           </p>

// //           <Link
// //           to = "/"
// //             className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
// //               ✕
// //             </Link>
// //         </form>
// //       </div>
// //       <Modal/>
// //     </div>
    
// //   );
// // };

// // export default SignUp;

// // Import necessary modules and components

// const SignUp = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const { createUser, login, updateUserProfile } = useContext(AuthContext);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const from = location.state?.from?.pathname || "/";

//   // const onSubmit = (data) => {
//   //   const { email, password, name, telephone } = data;
//   //   createUser(email, password, name, telephone)
//   //     .then((result) => {
//   //       const user = result.user;
//   //       updateUserProfile(data.email, data.photoURL).then(() => {
//   //         const userInfor = {
//   //           name: data.name,
//   //           email:data.email,
//   //           telephone:data.telephone
//   //         }
//   //         axios.post('http://localhost:6001/users', userInfor)
//   //         .then((response) => {
//   //           console.log(response);
//   //           alert("Account created successfully");
//   //           navigate("/");
//   //         });
//   //       });
        
//   //       document.getElementById("my_modal_5").close();
//   //     })
//   //     .catch((error) => {
//   //       const errorCode = error.code;
//   //       const errorMessage = error.message;
//   //       console.error("Error creating account:", errorMessage);
//   //     });
//   // };

//   // fix bug after gpt
//   const onSubmit = (data) => {
//   const { email, password, name, telephone } = data;
//   createUser(email, password, name, telephone)
//     .then((result) => {
//       const user = result.user;
//       updateUserProfile(data.email, data.photoURL).then(() => {
//         const userInfo = {
//           name: data.name,
//           email: data.email,
//           telephone: data.telephone
//         };
//         axios.post('http://localhost:6001/users', userInfo)
//           .then((response) => {
//             console.log(response);
//             alert("Account created successfully");
//             navigate("/"); // Navigate to home page after successful sign-up
//           });
//       });
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.error("Error creating account:", errorMessage);
//     });
// };

//   return (
//     <div className="max-w-md bg-white shadow w-full mx-auto flex items center justify-center my-20">
//       <div className="modal-actio mt-0">
//         {/* Form */}
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="card-body"
//           method="dialog"
//         >
//           <h1 className="font-bold text-lg">Create A Account!</h1>

//           {/* Email */}
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Email</span>
//             </label>
//             <input
//               type="email"
//               placeholder="Email"
//               className="input input-bordered"
//               {...register("email")}
//             />
//           </div>

//           {/* Password */}
//           {/* Add Name and Telephone fields */}
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Name</span>
//             </label>
//             <input
//               type="text"
//               placeholder="Name"
//               className="input input-bordered"
//               {...register("name")}
//             />
//           </div>

//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Telephone</span>
//             </label>
//             <input
//               type="tel"
//               placeholder="Telephone"
//               className="input input-bordered"
//               {...register("telephone")}
//             />
//           </div>

//           {/* Password */}
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Password</span>
//             </label>
//             <input
//               type="password"
//               placeholder="Password"
//               className="input input-bordered"
//               {...register("password")}
//             />
//             <label className="label mt-1">
//               <a href="#" className="label-text-alt link link-hover">
//                 Forgot password?
//               </a>
//             </label>
//           </div>

//           {/* Error text */}
//           {/* Login button */}
//           <div className="form-control mt-6">
//             <input
//               type="submit"
//               value="Sign Up"
//               className="btn btn-primary"
//             />
//           </div>

//           {/* Already have account */}
//           <p className="text-center my-2">
//             Already have an account?{" "}
//             <button
//               to="/signup"
//               className="underline text-red ml-1"
//               onClick={() => document.getElementById("my_modal_5").showModal()}
//             >
//               Log in
//             </button>{" "}
//           </p>

//           {/* Close button */}
//           <Link
//             to="/"
//             className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
//           >
//             ✕
//           </Link>
//         </form>
//       </div>
//       {/* Modal component */}
//       <Modal />
//     </div>
//   );
// };

// export default SignUp;


// SignUp.jsx

import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { AuthContext } from "../context/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, login, updateUserProfile } = useContext(AuthContext);

  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const { email, password, name, telephone } = data;
    createUser(email, password, name, telephone)
      .then((result) => {
        const user = result.user;
        updateUserProfile(data.name, data.photoURL).then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
            telephone: data.telephone // Include telephone number in the userInfo object
          };
          axiosPublic.post('/users', userInfo)
            .then((response) => {
              console.log(response);
              alert("Account created successfully");
              navigate("/"); // Navigate to home page after successful sign-up
            });
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error creating account:", errorMessage);
      });
  };

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="modal-actio mt-0">
        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body"
          method="dialog"
        >
          <h1 className="font-bold text-lg">Create A Account!</h1>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered"
              {...register("email")}
            />
          </div>

          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered"
              {...register("name")}
            />
          </div>

          {/* Telephone */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Telephone</span>
            </label>
            <input
              type="tel"
              placeholder="Telephone"
              className="input input-bordered"
              {...register("telephone")}
            />
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered"
              {...register("password")}
            />
            <label className="label mt-1">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>

          {/* Error text */}
          {/* Login button */}
          <div className="form-control mt-6">
            <input
              type="submit"
              value="Sign Up"
              className="btn btn-primary"
            />
          </div>

          {/* Already have account */}
          <p className="text-center my-2">
            Already have an account?{" "}
            <button
              to="/signup"
              className="underline text-red ml-1"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              Log in
            </button>{" "}
          </p>

          {/* Close button */}
          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </Link>
        </form>
      </div>
      {/* Modal component */}
      <Modal />
    </div>
  );
};

export default SignUp;
