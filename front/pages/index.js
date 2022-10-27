import React from "react";
import EventCarousel from "../components/main/EventCarousel";
import MainCategory from "../components/main/MainCategory";
import ProductCarousel from "../components/main/ProductCarousel";
// import AzDeliveryCarousel from "../components/main/azdeliveryCarousel";
import { Container } from "@mui/system";

export default function Main() {
  return (
    <Container maxWidth="false" sx={{ m: 0 }}>
      <EventCarousel />
      <MainCategory />
      <ProductCarousel />
      {/* <ProductCarousel /> */}
      {/* <AzDeliveryCarousel /> */}
    </Container>
  );
}
