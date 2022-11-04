import React, { useState } from "react";
import styled from "styled-components";
import SearchSideNav from "../components/nav/SearchSideNav";
import ProductLIst from "../components/product/ProductLIst";

// State
import { searchName } from "../states";
export default function Search() {
  const [searchValue, setSearchValue] = useState(searchName);
  console.log(searchValue);
  return (
    <Container>
      <h1>과자/디저트/아이스크림</h1>
      <div style={{ display: "flex", width: "100%" }}>
        <SideDiv>
          <SearchSideNav />
        </SideDiv>
        <MainDiv>
          <ProductLIst />
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
