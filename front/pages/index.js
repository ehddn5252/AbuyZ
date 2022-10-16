import React from "react";
import EventCarousel from "../components/main/EventCarousel";
import MainCategory from "../components/main/MainCategory";
import ProductCarousel from "../components/main/ProductCarousel";

export default function Main() {
  return (
    <div>
      <h1> Main 페이지</h1>
      <EventCarousel />
      <ProductCarousel />
      <MainCategory />
      <ProductCarousel />
    </div>
  );
}
