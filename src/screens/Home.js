import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import "../App.css"

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    try {
      let response = await fetch("https://food-delivery-web-pvcg.onrender.com/api/foodData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        response = await response.json();
        setFoodCat(response[1]);
        setFoodItem(response[0]);
      } else {
        console.error("Failed to fetch data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Navbar />
      <div className='container'>
        <div id="carouselExampleFade" className="carousel slide carousel-fade custom-carousel" data-bs-ride="carousel">
          <div className="carousel-inner">
            {/* Search form with z-index set */}
            <div className='carousel-caption' style={{ zIndex: "10" }}>
              <form className="d-flex justify-content-center">
                <input 
                  className="form-control me-2" 
                  type="search" 
                  placeholder="Search" 
                  aria-label="Search" 
                  value={search} 
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="btn btn-outline-success text-white bg-success" type="button">
                  Search
                </button>
              </form>
            </div>

            {/* Carousel items */}
            <div className="carousel-item active">
              <img src="./images/burger.jpg" className="d-block w-100" alt="Burger" />
            </div>
            <div className="carousel-item">
              <img src="./images/momos.jpg" className="d-block w-100" alt="Momos" />
            </div>
            <div className="carousel-item">
              <img src="./images/pizza.jpg" className="d-block w-100" alt="Pizza" />
            </div>
          </div>

          {/* Carousel navigation buttons */}
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* Food categories and items */}
        {foodCat.length > 0 ? (
          foodCat.map((category) => (
            <div className='row mb-3' key={category._id}>
              <div className='fs-3 m-3'>
                {category.CategoryName}
              </div>
              <hr />
              {foodItem.length > 0 &&
                foodItem
                  .filter((item) => item.CategoryName === category.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                  .map((filterItems) => (
                    <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                      <Card 
                        foodItem={filterItems}
                        options={filterItems.options[0]}
                      />
                    </div>
                  ))
              }
            </div>
          ))
        ) : (
          <div>No categories available</div>
        )}
      </div>
      <Footer />
    </>
  );
}
