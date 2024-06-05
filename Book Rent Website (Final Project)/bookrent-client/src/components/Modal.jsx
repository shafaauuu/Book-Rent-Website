import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";

const Modal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  // redirecting to home page or specifig page
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    // console.log(email, password)
    login(email, password)
      .then((result) => {
        const user = result.user;
        alert("login successful");
        navigate(from, {replace: true})
        document.getElementById("my_modal_5").close()
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage("Provide a correct email and password");
      });
  };

  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">
        <div className="modal-actio mt-0">
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">
            <h1 className="font-bold text-lg">Enter your email and password for login</h1>

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

            <button htmlFor="my_modal_5" onClick={() => document.getElementById("my_modal_5").close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
