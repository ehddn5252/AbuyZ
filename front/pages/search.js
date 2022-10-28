import React from "react";
import styled from "styled-components";
import SearchSideNav from "../components/nav/SearchSideNav";
import ProductLIst from "../components/product/ProductLIst";

export default function Search() {
  return (
    <Container>
      <SideDiv>
        <SearchSideNav />
      </SideDiv>
      <MainDiv>
        <ProductLIst />
      </MainDiv>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 55%;
  margin: 0 22%;
  margin-top: 3rem;
  min-height: 86vh;
`;

const SideDiv = styled.div`
  width: 20%;
`;

const MainDiv = styled.div`
  width: 80%;
`;
