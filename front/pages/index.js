import React from "react";
import EventCarousel from "../components/main/EventCarousel";
import MainCategory from "../components/main/MainCategory";
import ProductCarousel from "../components/main/ProductCarousel";
import { Container } from "@mui/system";

export default function Main() {
  return (
    <Container sx={{ my: 10 }}>
      <EventCarousel />
      <ProductCarousel />
      <MainCategory />
      <ProductCarousel />
    </Container>
  );
}
