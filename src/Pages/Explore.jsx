import React from "react";
import { Link } from "react-router-dom";
import rentCategory from "../assets/jpg/rentCategoryImage.jpg";
import sellCategory from "../assets/jpg/sellCategoryImage.jpg";
import Slider from "../Components/Slider";
const Explore = () => {
  return (
    <div className="explore">
      <header>
        <p className="pageHeader">Explore</p>
      </header>
      <main>
        <Slider />
        <p className="exploreCategoryHeading">Categories</p>
        <div className="exploreCategories">
          <Link to="/category/rent" className="exploreCategory">
            <img
              src={rentCategory}
              alt="rentCategory"
              className="exploreCategoryImg"
            />
            <p className="exploreCategoryName">Place For Rent</p>
          </Link>

          <Link to="/category/sale" className="exploreCategory">
            <img
              src={sellCategory}
              alt="rentCategory"
              className="exploreCategoryImg"
            />
            <p className="exploreCategoryName">Place For Sell</p>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Explore;
