import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards";
import { FaFilter, FaSearch } from "react-icons/fa";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");

  // loading data
  useEffect(() => {
    // fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:6001/menu");
        const data = await response.json();
        setMenu(data);
        setFilteredItems(data);
      } catch (error) {
        console.log("error fetching data ", error);
      }
    };

    // call the function
    fetchData();
  }, []);

  // filtering data based on category
  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu.filter((item) => item.category === category);

    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // show all data function
  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  // search functionality
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase(); // Ubah ke huruf kecil
    setSearchTerm(searchTerm);
    
    // Filter langsung setiap kali ada perubahan pada input pencarian
    const filtered = menu.filter((item) => 
      item && item.Title && item.Title.toLowerCase().includes(searchTerm)
    );
    
    setFilteredItems(filtered);
    setCurrentPage(1);
  };
  // sorting based on A-Z, Z-a, Low high pricing
  const handleSortChange = (option) => {
    setSortOption(option);

    let sortedItems = [...filteredItems];

    //logic
    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.Title.localeCompare(b.Title));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.Title.localeCompare(a.Title));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;

      default:
        break;
    }

    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  // pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* Menu banner */}

      <div className="max-w-screen-2xl container mx-auto xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-48 flex flex-col  items-center justify-center gap-8">

          {/* texts */}
          <div className="text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Book <span className="text-blue">Rent</span>
            </h2>
            <p className="text-[#4A4A4A] text-xl md:w-4/5 mx-auto">
            Invest in top-notch education with affordable Book rental.
            </p>
                      {/* search bar */}
          <div className="relative mx-auto max-w-md">
            <input
              type="text"
              className="w-full border to-blue rounded-md py-7 px-9 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black "
              placeholder="Enter the Book Title"
              value={searchTerm}
              onChange={handleSearch}
            />
            <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
          </div>
          </div>
        </div>
      </div>

      {/* menu shop section */}
      <div className="section-container">
        {/* filtering  and sorting  */}
        <div className="flex flex-col  md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
          {/* all category  btns   need to fix it */}
          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
            <button
              onClick={showAll}
              className={selectedCategory === "all" ? "active" : ""}
            >
              All
            </button>
            <button
              onClick={() => filterItems("novel")}
              className={selectedCategory === "novel" ? "active" : ""}
            >
              Novel
            </button>
            <button
              onClick={() => filterItems("comic")}
              className={selectedCategory === "comic" ? "active" : ""}
            >
              Comic
            </button>
            <button
              onClick={() => filterItems("bibliography")}
              className={selectedCategory === "bibliography" ? "active" : ""}
            >
              Bibliography
            </button>
            <button
              onClick={() => filterItems("encyclopedia")}
              className={selectedCategory === "encyclopedia" ? "active" : ""}
            >
              Encyclopedia
            </button>
          </div>
        </div>

        {/* sorting base filtering */}
        <div className="flex justify-end mb-4 rounded-sm">
          <div className="bg-blue p-2">
            <FaFilter className="h-4 w-4 text-white" />
          </div>

          {/* sorting options */}
          <select
            name="sort"
            id="sort"
            onChange={(e) => handleSortChange(e.target.value)}
            value={sortOption}
            className="bg-grey text-black px-2 py-1 rounded-sm"
          >
            <option value="default"> Default </option>
            <option value="A-Z"> sort alphabetically (A-Z) </option>
            <option value="Z-A"> sort alphabetically (Z-A) </option>
            <option value="low-to-high">Sort by cheapest</option>
            <option value="high-to-low">Sort by most expensive</option>
          </select>
        </div>

        {/* products card */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
          {currentItems.map((item) => (
            <Cards key={item._id} item={item} />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center my-8">
        {Array.from({
          length: Math.ceil(filteredItems.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === index + 1 ? "bg-blue text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
