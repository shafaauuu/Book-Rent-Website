import React from "react";
import useTransaction from "../../hooks/useTransaction";

const TransactionHistory = () => {
  const [transaction, refetch] = useTransaction();

  const handleConfirm = () => {
    alert("Wait until admin confirms your payment");
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-28">
      <div className="bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-36 flex flex-col items-center justify-center gap-8">
          {/* texts */}
          <div className=" px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Check All Of Your <span className="text-blue">complete transactions </span>
            </h2>
          </div>
          {/* table for the cart */}

          <div>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead className="bg-blue text-white rounded-sm">
                  <tr>
                    <th>#</th>
                    <th>Book</th>
                    <th>Title</th>
                    <th>Quantity</th>
                    <th>rental fees</th>
                    <th>Penalty</th>
                    <th>Rent Date</th>
                    <th>Return Date</th>
                    <th>Total Payment </th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
  {/* map over transactions and render each transaction */}
  {transaction.map((item, index) => 
    // Only render if the status is "Belum dibayar"
    item.status === "paid" && (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={item.image} alt="" />
              </div>
            </div>
          </div>
        </td>
        <td>{item.Title}</td>
        <td>{item.quantity}</td>
        <td>Rp. {item.price}</td>
        <td>Rp. {item.penalty}</td>
        <td>{item.transaction_date}</td>
        <td>{item.returnDate}</td>
        <td className="font-bold text-blue">Rp. {item.price + item.penalty}</td> {/* Calculate total payment */}
        <td className="font-bold text-red">{item.status}</td>

      </tr>
    )
  )}
</tbody>


                {/* foot */}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
