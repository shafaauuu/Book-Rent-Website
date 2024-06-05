import React, { useEffect } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";

const UpdateTransaction = () => {
  const { id } = useParams(); // Dapatkan ID dari parameter URL
  const item = useLoaderData(); // Muat data menggunakan fungsi loader
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    // Log data untuk debugging
    console.log("Item:", item);
    console.log("ID:", id);
  }, [item, id]);

  const onSubmit = async (data) => {
    try {
      const transactionItem = {
        price: Number(data.price),
        penalty: Number(data.penalty),
        status: data.status,
      };

      const response = await axiosSecure.patch(`/transactions/${id}`, transactionItem);

      if (response.status === 200) {
        reset();
        Swal.fire({
          position: "justify-center",
          icon: "success",
          title: "Your transaction has been updated",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/manage-rental");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">Update <span className="text-blue"> Transaction</span></h2>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>


          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              defaultValue={item.price}
              type="text"
              {...register("price", { required: true })}
              placeholder="Enter Price"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Penalty</span>
            </label>
            <input
              defaultValue={item.penalty}
              type="text"
              {...register("penalty", { required: true })}
              placeholder="Enter Penalty"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Status</span>
            </label>
            <select
              {...register("status", { required: true })}
              className="select select-bordered"
              defaultValue={item.status}
            >
              <option value="Belum dibayar">Unpaid</option>
              <option value="paid">Paid</option>
            </select>
          </div>

          <button className="btn bg-blue text-white px-6" type="submit">
            <FaPlus /> Update Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTransaction;
