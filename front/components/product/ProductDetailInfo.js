// React
import React from "react";
import Image from "next/image";
import DetailImage from "../../public/images/detail1.png";
// styledComponent
import styled from "styled-components";

export default function ProductDetailInfo() {
  return (
    <Container>
      <Image src={DetailImage} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  margin-top: 5rem;
  margin-bottom: 5rem;
`;
