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
      {product.products.descriptionImg}
      <img src={product.products.descriptionImg} alt="사진업소" />
    </Container>
  ) : null;
}

const Container = styled.div`
  width: 100%;
  /* background-color: red; */
  height: 6600px;
  /* background-image: url("https://red.lotteon.com/goodsdetail?view=type1-raw&model=itemdetail%2FLO%2F15%2F84%2F06%2F09%2F24%2FDSCRP_LO1584060924"); */
  /* background-image: url("https://doc-pub.lotteon.com/ec/public/P269E897CF97900DC771F9D81CC3E5592E5D424FD315A773DDC60C63176F2ED14/file"); */
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
