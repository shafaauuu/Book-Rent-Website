import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";

const Login = () => {

    // const {
    //     register,
    //     handleSubmit,
    //     formState: { errors },
    //   } = useForm();
    
    //   const { login } = useContext(AuthContext);
    //   const [errorMessage, setErrorMessage] = useState("");
    
    //   // redirecting to home page or specific page
    //   const location = useLocation();
    //   const navigate = useNavigate();
    
    //   const from = location.state?.from?.pathname || "/";
    
    //   const onSubmit = (data) => {
    //     const email = data.email;
    //     const password = data.password;
    //     // console.log(email, password)
    //     login(email, password)
    //       .then((result) => {
    //         const user = result.user;
    //         const userInfor = {
    //             name: data.name,
    //             email:data.email,
    //             telephone:data.telephone
    //           }
    //           axios.post('http://localhost:6001/users', userInfor)
    //           .then((response) => {
    //             console.log(response);
    //             alert("Account created successfully");
    //             navigate(from, { replace: true });
    //           });

    //         document.getElementById("my_modal_5").close()
    //       })
    //       .catch((error) => {
    //         const errorMessage = error.message;
    //         setErrorMessage("Provide a correct email and password");
    //       });
    //   };

    // after gpt
    const { register, handleSubmit } = useForm();
    const { login } = useContext(AuthContext);

    const [errorMessage, setErrorMessage] = useState("");

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";
  
    const onSubmit = (data) => {
      const { email, password } = data;
      login(email, password)
        .then((result) => {
          const user = result.user;
          // Now that the user is logged in, navigate to the specified page
          navigate(from, { replace: true });
        })
        .catch((error) => {
          setErrorMessage("Provide a correct email and password");
        });
    };



      return (
        <div>
            <div>
    <h5 className="font-bold text-4xl max-w-md text-blue w-full mx-auto flex items-center justify-center my-20">LOGIN PAGE</h5>
  </div>
         
         <div className="max-w-md bg-white shadow w-full mx-auto flex items center justify-center my-20">
              <div className="modal-actio mt-0">
                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="card-body" dialog>
                  
      
                  {/* email */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="email" className="input input-bordered" {...register("email")} />
                  </div>
      
                  {/* password */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="password" className="input input-bordered" {...register("password")} />
                    <label className="label mt-1">
                      <a href="#" className="label-text-alt link link-hover">
                        Forgot password?
                      </a>
                    </label>
                  </div>
                  {/* error */}
                  {errorMessage && <p className="text-red text-xs italic">{errorMessage}</p>}
      
                  {/* login button  */}
                  <div className="form-control mt-6">
                    <input type="submit" value="Login" className="btn btn-primary" />
                  </div>
      
                  <p className="text-center my-2">
                    Don't have an account?{" "}
                    <Link to="/signup" className="underline text-red ml-1">
                      Sign Up Now
                    </Link>{" "}
                  </p>
      
                  <button onClick={() => document.getElementById("my_modal_5").close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
              </div>
            </div>
        
        </div>
      )
      
}

export default Login;
