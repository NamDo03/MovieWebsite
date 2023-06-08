import React from "react";
import CardSlider from "./CardSlider";

const Slider = ({ movies }) => {
  const getMoviesFromRange=(from,to) => {
    return movies.slice(from,to);
  } 
  return (
    <div>
      <CardSlider title="Netflix Originals" data={getMoviesFromRange(0,10)}/>
      <CardSlider title="Trending" data={getMoviesFromRange(10,20)}/>
      <CardSlider title="Top Search" data={getMoviesFromRange(20,30)}/>
      <CardSlider title="Top Rated" data={getMoviesFromRange(30,40)}/>
      <CardSlider title="New Releases" data={getMoviesFromRange(40,50)}/>
      <CardSlider title="Popular On Netflix" data={getMoviesFromRange(50,60)}/>
    </div>
  );
};

export default Slider;
