import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import graph from "../../assets/graph.png";
import money from "../../assets/money.jpg";
import meeting from "../../assets/meeting.png";

class SimpleSlider extends React.Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true
    };
    return (
      <Slider {...settings}>
        <div>
          <img src={meeting} alt="not found"></img>{" "}
        </div>
        <div>
          <img src={graph} alt="not found"></img>{" "}
        </div>
        <div>
          <img src={money} alt="not found"></img>{" "}
        </div>
      </Slider>
    );
  }
}

export default SimpleSlider;
