import React from "react";
import bannerImg from "/images/home/pngwing.com.png";

const Banner = () => {
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
      <div className="py-24 flex flex-col md:flex-row-reverse items-center justify-between gap-8">
        {/* img */}
        <div className="md:w-1/2">
          <img src={bannerImg} alt="" />
          <div className="flex flex-col md:flex-row items-center justify-around -mt-14 gap-4">
            
            <div className="bg-white px-3 py-2 rounded-2xl md:flex items-center gap-3 shadow-sm w-64 hidden">
             
             
            </div>
          </div>
        </div>

        {/* texts */}
        <div className="md:w-1/2 px-4 space-y-7">
          <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
            Save Up To 90% On <span className="text-blue">Textbook</span>
          </h2>
          <p className="text-[#4A4A4A] text-xl">
          Tired of paying so much for books? Rent used  with BooksRental 
          and save money! We offer book rentals, the best deals, 
          and an easy book rental process.
          </p>
          <a href="/menu" className="bg-blue font-semibold btn text-white px-8 py-3 rounded-full">
            Click Here To Start Rent!
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
