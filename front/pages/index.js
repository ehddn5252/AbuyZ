import React from "react";
import EventCarousel from "../components/main/EventCarousel";
import MainCategory from "../components/main/MainCategory";
import ProductCarousel from "../components/main/ProductCarousel";
import AzDeliveryCarousel from "../components/main/AzDeliveryCarousel";
import { Container } from "@mui/system";

export default function Main() {
  return (
    <div style={{ width: "100%", height: "auto" }}>
      <div style={{ width: "100%" }}>
        <EventCarousel />
      </div>
      <MainCategory />
      <ProductCarousel />
      <AzDeliveryCarousel />
    </div>
  );
}
