const Categories = () => {
  const categoryItems = [
    {
      id: 1,
      title: "Main Dish",
      doc: "(86 dishes)",
      image: "../../../public/image/categorise/Main Dish-bargar.png",
    },
    {
      id: 2,
      title: "Breakfast",
      doc: "(12 breakfast fast)",
      image: "../../../public/image/categorise/Break fast.png",
    },
    {
      id: 3,
      title: "Dessert",
      doc: "(48 desserts)",
      image: "../../../public/image/categorise/Dessert.png",
    },
    {
      id: 4,
      title: "Browse All",
      doc: "(255 items)",
      image: "../../../public/image/categorise/Browse All.png",
    },
  ];
  return (
    <div className="section-container py-12">
      {/* Heading start ------ */}
      <div className="text-center">
        <p className="subtitle">Customer Favorites</p>
        <h2 className="title">Popular Catagories</h2>
      </div>

      {/* Heading end ------ */}

      {/*categories card ------start*/}
      <div className="flex flex-col  gap-y-7 md:flex-row flex-wrap justify-around mt-12 ">
        {categoryItems?.map((item, id) => (
          <div
            key={id}
            className="drop-shadow-lg rounded-[40px] bg-white w-64 py-7 px-3 mx-auto text-center cursor-pointer hover:-translate-y-4 duration-300 transition-all "
          >
            {/* images */}
            <div className="flex justify-center items-center w-full mx-auto">
              <img
                src={item.image}
                alt="categories image "
                className="bg-[#ECE3BA] p-5 rounded-full w-28 h-28"
              />
            </div>
            <div className="mt-5 space-y-1">
              <h5 className="text-2xl font-semibold">{item.title}</h5>

              <p className="text-secondary">{item.doc}</p>
            </div>
          </div>
        ))}
      </div>
      {/*categories card ------end*/}
    </div>
  );
};

export default Categories;
