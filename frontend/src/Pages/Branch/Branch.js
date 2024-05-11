import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Branch.css"; // Import your CSS file

function App() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div>
      <div className="branch-slider-container">
        <Slider {...settings}>
          {data.map((d, index) => (
            <div key={index} className="branch-card">
              <div className="branch-card-image">
                <img src={d.img} alt="" />
              </div>
              <div className="branch-card-content">
                <p className="branch-card-title">{d.name}</p>
                <p className="branch-card-review">{d.review}</p>
                <button className="branch-card-button">Read more</button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

const data = [
  {
    name: "Polonnaruwa Branch",
    img: "/branch/1.jpg",
    review:
      "Our Polonnaruwa Branch, nestled amidst ancient ruins, safeguards the city s rich cultural legacy. From majestic stupas to bustling communities, we preserve Polonnaruwa s heritage with respect and dedication. With trained firefighters and a deep understanding of its significance, we ensure protection with utmost care, standing as steadfast guardians of this UNESCO World Heritage Site.",
  },
  {
    name: "Anuradhapura Branch",
    img: "/branch/2.jpg",
    review:
      "In Anuradhapura s sacred heartland, our branch stands as a beacon of protection. Entrusted with safeguarding revered sites and bustling urban centers, we uphold the city s sanctity. From ancient ruins to modern communities, we ensure safety and security with reverence and vigilance, embodying the spirit of guardianship and reverence for Anuradhapura s spiritual heritage.",
  },
  {
    name: "Kuliyapitiya Branch",
    img: "/branch/3.jpg",
    review:
      "At Kuliyapitiya s heart, our branch embodies community spirit and protection. Committed to suburban safety, we empower residents with proactive initiatives and responsive services. From marketplaces to neighborhoods, we stand as defenders, ensuring safety, security, and peace of mind for all, fostering a sense of unity and resilience within the community.",
  },
  {
    name: "Mihintale Branch",
    img: "/branch/4.jpg",
    review:
      "Perched amidst tranquil hills, our Mihintale Branch protects nature and rural communities. With a deep appreciation for its beauty, we safeguard landscapes and provide essential services. From mountaintops to forests, our trained firefighters navigate challenges, ensuring safety, security, and preservation of Mihintale s natural splendor, serving as vigilant guardians of this serene and picturesque region.",
  },
];

export default App;

