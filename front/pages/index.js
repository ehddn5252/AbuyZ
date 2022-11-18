import React from "react";

// 하위 컴포넌트
import EventCarousel from "../components/main/EventCarousel";
import MainCategory from "../components/main/MainCategory";
import ProductCarousel from "../components/main/ProductCarousel";
import AzDeliveryCarousel from "../components/main/AzDeliveryCarousel";

// Styled-component
import styled from "styled-components";

export default function Main() {
  return (
    <Container>
      <div style={{ width: "100%" }}>
        <EventCarousel />
      </div>
      <MainCategory />
      <ProductCarousel />
      <AzDeliveryCarousel />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: auto;
`;
