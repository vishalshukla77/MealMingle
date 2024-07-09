import React from 'react';

export default function Carousel() {
  // Generate a random Lorem Picsum image URL with specific dimensions and keywords
  const generateRandomImageUrl = (keyword) => {
    const width = 900;
    const height = 700;
    const url = `https://picsum.photos/seed/${keyword}/${width}/${height}`;
    console.log(`Generated URL for ${keyword}: ${url}`);
    return url;
  };

  return (
    <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
        <div className="carousel-inner">
          {/* Search form with z-index set */}
          <div className='carousel-caption' style={{ zIndex: "10" }}>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
            </form>
          </div>

          {/* Carousel items */}
          <div className="carousel-item active">
            <img src={generateRandomImageUrl("burger")} className="d-block w-100" alt="Burger" />
          </div>
          <div className="carousel-item">
            <img src={generateRandomImageUrl("momos")} className="d-block w-100" alt="Momos" />
          </div>
          <div className="carousel-item">
            <img src={generateRandomImageUrl("pizza")} className="d-block w-100" alt="Pizza" />
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
    </div>
  );
}
