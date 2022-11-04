import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchSideNav from "../components/nav/SearchSideNav";
import ProductLIst from "../components/product/ProductLIst";

// API
import { keywordSearch } from "./api/product";

import { useRecoilState } from "recoil";
// State
import { searchName } from "../states";
export default function Search() {
  const [searchValue, setSearchValue] = useRecoilState(searchName);
  const [productList, setProductList] = useState([]);
  const getProductList = async () => {
    const res = await keywordSearch(searchValue);
    setProductList(res.data);
  };

  useEffect(() => {
    getProductList();
  }, [searchValue]);
  console.log(searchValue);
  return (
    <Container>
      <h1>과자/디저트/아이스크림</h1>
      <div style={{ display: "flex", width: "100%" }}>
        <SideDiv>
          <SearchSideNav />
        </SideDiv>
        <MainDiv>
          <ProductLIst productList={productList} />
        </MainDiv>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 55%;
  margin: 0 22%;
  margin-top: 2rem;
  min-height: 86vh;
`;

const SideDiv = styled.div`
  width: 20%;
`;

const MainDiv = styled.div`
  width: 80%;
`;
