import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import "./Slider.css";
import { sliderItems } from '../../data';
const Slider=()=> {
  return (
    <div className='slider-comp'>
      <Carousel>
        {sliderItems.map((items)=>(
          <Carousel.Item key={items.id}>
          <img
            className="d-block w-100 slider-img"
            src={items.img}
            alt="slide-img"
          />
          <Carousel.Caption>
            <h2>{items.title}</h2>
            <h5>{items.desc}</h5>
          </Carousel.Caption>
        </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Slider;