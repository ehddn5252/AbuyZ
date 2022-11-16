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
  // style={{ backgroundImage: `url(${product.products.descriptionImg})` }}
  return product.length !== 0 ? (
    <Container>
      {/* <div
        style={{
          width: "100%",
          
        }}
        dangerouslySetInnerHTML={{ __html: product.products.descriptionImg }}
      ></div>
      ; */}
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
