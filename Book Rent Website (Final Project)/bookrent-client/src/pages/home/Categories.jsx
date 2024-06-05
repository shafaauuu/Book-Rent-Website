import React from 'react'

const categoryItems = [
    {id: 1, title: "Novel ", despriction: "", image: "/images/home/category/romance_category.jpg"},
    {id: 2, title: "Encyclopedia", despriction: "", image: "/images/home/category/enci.jpeg"},
    {id: 3, title: "Bibliography", despriction: "", image: "/images/home/category/bibli.jpg"},
    {id: 4, title: "Comic", despriction: "", image: "/images/home/category/comic_category.jpg"}
]

const Catagories = () => {
  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 py-16'>
        <div className='text-center'>
            <p className='subtitle'>Customer Favorites</p>
            <h2 className='title'>Popular Categories</h2>
        </div>

        {/* category cards */}
        <div className='flex flex-col sm:flex-row flex-wrap gap-8 justify-around items-center mt-12 '>
            {
                categoryItems.map((item, i) => (
                    <div key={i} className='shadow-lg rounded-md bg-babyblue py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 transition-all duration-300 z-10'>
                        <div className='w-full mx-auto flex items-center justify-center'><img src={item.image} alt="" className='   w-28 h-28' /></div>
                        <div className='mt-5 space-y-1'>
                            <h5 className='text-[#1E1E1E] font-semibold'>{item.title}</h5>
                            <p className='text-secondary text-sm'>{item.despriction}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Catagories