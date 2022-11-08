// React
import React, { useState, useEffect } from "react";

// styledComponent
import styled from "styled-components";

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
      <img src={product.products.descriptionImg} alt="사진업소" />
    </Container>
  ) : null;
}

const Container = styled.div`
  width: 100%;
  min-height: 6600px;
  margin-top: 5rem;
  margin-bottom: 5rem;
  background-repeat: no-repeat;
  background-size: cover;
`;

const DetailImg = styled.img`
  width: 100%;
  min-height: fit-content;
  object-fit: cover;
`;
