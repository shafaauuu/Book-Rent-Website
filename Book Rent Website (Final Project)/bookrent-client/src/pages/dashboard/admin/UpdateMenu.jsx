import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import axios from "axios";

const UpdateMenu = () => {
  const item = useLoaderData();
  console.log(item);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const navigate = useNavigate();
  

  //   image hosting key
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  // console.log(image_hosting_key) using this for uploading image  in the profile side (TODO)

  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const hostingImg = await axiosPublic.post(image_hosting_api, formData);

      console.log("Image uploaded successfully:", hostingImg.data);

      if (hostingImg.data.success) {
        const menuItem = {
          Title: data.Title,
          category: data.category,
          price: parseFloat(data.price),
          rating: parseFloat(data.rating),
          author: data.author,
          image: hostingImg.data.data.display_url,
        };
        // console.log(menuItem);
        const postMenuItem = axiosSecure.patch(`/menu/${item._id}`, menuItem); //if error just define full localhost
        if (postMenuItem) {
          reset();
          Swal.fire({
            position: "justify-center",
            icon: "success",
            title: "Your item updated saved",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/manage-items")
        }
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="w-full md:w-[870px]  px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Update <span className="text-blue">Book</span>{" "}
      </h2>

      {/* form input a new book's */}

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text"> Enter Title Book </span>
            </label>
            <input
              type="text"
              defaultValue={item.Title}
              {...register("Title", { required: true })}
              placeholder="Enter Title Book"
              className="input input-bordered w-full"
            />
          </div>

          {/* second row  */}
          <div className="flex items-center gap-4">
            {/* categories */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Choose the Category</span>
                <span className="label-text-alt"></span>
              </label>
              <select
                {...register("category", { required: true })}
                className="select select-bordered"
                defaultValue={item.category}
              >
                <option disabled value="default">
                  Select The Category
                </option>
                <option value="novel">Novel</option>
                <option value="bibliography">Bibliography</option>
                <option value="comic">Comic</option>
                <option value="nonfiction">Non-fiction</option>
                <option value="encyclopedia">Encyclopedia</option>
              </select>
            </div>

            {/* prices */}

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text"> Price </span>
              </label>
              <input
                type="number"
                defaultValue={item.price}
                {...register("price", { required: true })}
                placeholder="Price"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* third row. rating */}

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text"> Rating </span>
            </label>
            <input
              defaultValue={item.rating}
              type="float"
              {...register("rating", { required: true })}
              placeholder="Rating"
              className="input input-bordered w-full"
            />
          </div>

          {/* fourth row */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Input the Author of the book</span>
            </label>
            <textarea
              {...register("author", { required: true })}
              defaultValue={item ? item.author : ""} // Check if item is defined before accessing its properties
              className="textarea textarea-bordered h-24"
              placeholder="Enter the author name!"
            ></textarea>
          </div>

          {/* fifth row */}
          <div className="form-control w-full my-6">
            <label className="label"></label>
            <input
            
              {...register(
                "image",

                { required: true }
              )}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <button className="btn bg-blue text-white px-6">
            {" "}
            <FaPlus /> Update Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMenu;
