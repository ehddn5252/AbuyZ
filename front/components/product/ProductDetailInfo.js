// React
import React, { useState, useEffect } from "react";

// styledComponent
import styled from "styled-components";

// Image
import sandwich from "../../public/images/sandwich.png";

// API
import { productDetail } from "../../pages/api/product";
export default function ProductDetailInfo() {
  const [product, setProduct] = useState([]);

  // 상품 데이터 가져오기
  const loadData = async (id) => {
    const res = await productDetail(id);
    setProduct(res.data);
  };
  useEffect(() => {
    const pathname = window.location.pathname;
    const id = pathname.split("/")[2];
    loadData(id);
  }, []);
  return product.length !== 0 ? (
    <Container>
      {product.products.descriptionImg ? (
        <iframe
          frameBorder="0"
          width="100%"
          scrolling="no"
          style={{
            overflowX: "hidden",
            overflow: "auto",
            minHeight: "6000px",
          }}
          src={product.products.descriptionImg}
        />
      ) : (
        <SandDiv>
          <DetailImg src="/images/sandwich.png" />
          <DetailImg src="/images/sandwich2.png" />
          <DetailImg src="/images/sandwich3.png" />
          <DetailImg src="/images/sandwich4.png" />
          <DetailImg src="/images/sandwich5.png" />
          <DetailImg src="/images/sandwich6.png" />
        </SandDiv>
      )}
    </Container>
  ) : null;
}

const Container = styled.div`
  width: 100%;
  margin-top: 5rem;
  margin-bottom: 5rem;
  background-repeat: no-repeat;
  background-size: cover;
`;

const DetailImg = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const SandDiv = styled.div`
  width: 100%;
  height: auto;
`;
