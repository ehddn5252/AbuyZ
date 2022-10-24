import React from "react";
import styled from "styled-components";
import ProductCategory from "../components/product/ProductCategory";
import ProductLIst from "../components/product/ProductLIst";

export default function Search() {
  return (
    <div>
      {/* 1. 돋보기 버튼을 누르면 ''의 검색결과 */}
      {/* 2. 카테고리를 눌러서 들어오면 카테고리 가 뜸 */}
      <Center>
        <h1>검색 페이지</h1>
      </Center>
      <Center>
        <ProductCategory />
      </Center>
      <Center>
        <ProductLIst />
      </Center>
    </div>
  );
}

const Center = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;
