import React, { useEffect, useState } from "react";

import Cards from "../../components/Cards";
import { FaFilter } from "react-icons/fa";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItem, setFilteredItem] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(8);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/menu");
        const data = await response.json();
        // console.log(data);
        setMenu(data);
        setFilteredItem(data);
      } catch (error) {
        console.log("err fetch data ", error);
      }
    };
    // call function
    fetchData();
  }, []);
  // filter
  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu?.filter((item) => item.category === category);
    setFilteredItem(filtered);
    console.log(category);
    setSelectedCategory(category);
    setCurrentPage(1);
  };
  // show all
  const showAll = () => {
    setFilteredItem(menu);
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  // Sorting based on A-Z, Z-A, Low-High price
  const handleSortChange = (option) => {
    setSortOption(option);
    let sortItems = [...filteredItem];
    // logic
    switch (option) {
      case "A-Z":
        // code block
        sortItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        // code block
        sortItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        // code block
        sortItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        // code block
        sortItems.sort((a, b) => b.price - a.price);
        break;
      default:
        // code block
        break;
    }
    setFilteredItem(sortItems);
    setCurrentPage(1);
  };
  // pagination logic
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = filteredItem.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 500, behavior: "smooth" });
  };
  return (
    <div>
      <div className="section-container bg-gradient-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100% m-0">
        <div className="py-48 flex flex-col  justify-center items-center gap-8">
          {/*Menu banner  text 👍*/}
          <div className="text-center space-y-7 px-4">
            <h2 className="md:text-5xl text-4xl font-bold leading-snug">
              Dive into Delights Of Delectable
              <span className="text-orange"> Food</span>
            </h2>
            <p className="text-xl text-[#4A4A4A] md:w-4/5 mx-auto">
              Where Each Plate Weaves a Story of Culinary Mastery and Passionate
              Craftsmanship
            </p>
            <button className="btn rounded-full px-4 hover:bg-transparent hover:border-orange  bg-orange">
              Order Now
            </button>
          </div>
        </div>
      </div>
      {/* menu section */}
      <div className="section-container">
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
          {/* Filtering And Sorting */}
          <div className="flex py-10 font-bold flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
            <button
              onClick={showAll}
              className={selectedCategory === "all" ? "active" : ""}
            >
              All
            </button>
            <button
              onClick={() => filterItems("salad")}
              className={selectedCategory === "salad" ? "active" : ""}
            >
              Salad
            </button>
            <button
              onClick={() => filterItems("pizza")}
              className={selectedCategory === "pizza" ? "active" : ""}
            >
              Pizza
            </button>
            <button
              onClick={() => filterItems("soup")}
              className={selectedCategory === "soup" ? "active" : ""}
            >
              Soups
            </button>
            <button
              onClick={() => filterItems("dessert")}
              className={selectedCategory === "dessert" ? "active" : ""}
            >
              Desserts
            </button>
            <button
              onClick={() => filterItems("drinks")}
              className={selectedCategory === "drinks" ? "active" : ""}
            >
              Drinks
            </button>
          </div>
          {/* sorting base filtering */}
          <div className="flex justify-end mb-4 rounded-sm">
            <div className="bg-black p-2">
              <FaFilter className="h-4 w-4 text-white" />
            </div>
            {/* sorting options */}
            <select
              name="sort"
              id="sort"
              onChange={(e) => handleSortChange(e.target.value)}
              className="bg-black text-white px-7 py-1 rounded-sm"
              value={sortOption}
            >
              <option value="default">Default</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
        </div>

        {/* product card */}
        <div className=" grid   md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
          {currentItems?.map((item) => (
            <Cards key={item._id} item={item} />
          ))}
        </div>
      </div>
      {/* pagination btn */}
      <div className="flex  justify-center my-8">
        {Array.from({
          length: Math.ceil(filteredItem.length / itemPerPage),
        }).map((_, index) => (
          <button
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === index + 1 ? "bg-orange " : "bg-gray-200"
            }`}
            key={index + 1}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
