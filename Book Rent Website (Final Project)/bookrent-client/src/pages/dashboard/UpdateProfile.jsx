import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import axios from "axios";

const UpdateProfile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [imageHostingKey, setImageHostingKey] = useState(import.meta.env.VITE_IMAGE_HOSTING_KEY);
  const [imageHostingApi, setImageHostingApi] = useState(
    `https://api.imgbb.com/1/upload?key=${imageHostingKey}`
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Populate form fields with user data when userData is available
    if (user) {
      setValue("name", user.name);
      setValue("photoURL", user.photoURL);
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    const name = data.name;
    let photoURL = data.photoURL;
    if (data.image[0]) {
      try {
        const formData = new FormData();
        formData.append("image", data.image[0]);
        const hostingImg = await axios.post(imageHostingApi, formData);
        console.log("Image uploaded successfully:", hostingImg.data);
        if (hostingImg.data.success) {
          photoURL = hostingImg.data.data.display_url;
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
    updateUserProfile(name, photoURL)
      .then(() => {
        // Reload the page after updating the profile
        window.location.reload();
      })
      .catch((error) => {
        // Handle error
        console.error("Error updating profile:", error);
      });
  };

  const handleWatchClick = () => {
    setShowForm((prevShowForm) => !prevShowForm); // Toggle the showForm state
  };

  return (
    <div className="flex items-center justify-center h-screen space-x-8">
      {user && (
        <div className="card w-full max-w-4xl glass">
          <figure>
            <img
              src={user.photoURL} // Display user's profile image
              alt="Profile"
              className="profile-image, mask mask-circle"
              style={{ width: "200px", height: "200px" }} // Adjust the width and height as needed
            />
          </figure>
          <div  className="card-body">
          <h2 className="card-title">{user.displayName}</h2>
          <p>{user.email}</p>
          <div className="card-actions justify-end"> 
          <button className="btn btn-primary" onClick={handleWatchClick}>
          Update Your Profile
          </button>
          </div>
          </div>
        </div>
      )}

{showForm && ( 
      <div className="card w-96 bg-base-100 shadow-xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label">
             
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Your Name"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
             
            </label>
            <input
              type="text"
              {...register("telephone", { required: true })}
              placeholder="Your Phone Number"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Your email"
              className="input input-bordered w-full"
            />
          </div>
          

          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Upload Profile Picture</span>
            </label>
            <input {...register("image", { required: true })} type="file" className="file-input w-full" />
          </div>

          <button className="btn bg-blue text-white px-6">Update Profile</button>
        </form>
      </div>
      )}
      </div>
    );
  };

export default UpdateProfile;
