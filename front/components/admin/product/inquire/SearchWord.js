import React, { useState } from "react";
import styled from "styled-components";
import { SearchTitle } from "./InquireProduct";

// mui
import Grid2 from "@mui/material/Unstable_Grid2";

export default function SearchWord() {
  // 상품명
  const [name, setName] = useState("");
  const [namePlaceholder, setNamePlaceholder] =
    useState("상품명을 입력해주세요.");

  // 브랜드
  const [brand, setBrand] = useState("");
  const [brandPlaceholder, setBrandPlaceholder] =
    useState("브랜드를 입력해주세요.");

  // 키워드
  const [keyWord, setKeyWord] = useState("");
  const [keyWordPlaceholder, setKeyWordPlaceholder] =
    useState("키워드를 입력해주세요.");

  // 상품명 입력하면
  const nameChange = (event) => {
    setName(event.target.value);
  };
  const nameFocus = () => {
    setNamePlaceholder("");
  };
  const nameBlur = () => {
    setNamePlaceholder("상품명을 입력해주세요.");
  };

  // 브랜드 입력하면
  const brandChange = (event) => {
    setBrand(event.target.value);
  };
  const brandFocus = () => {
    setBrandPlaceholder("");
  };
  const brandBlur = () => {
    setBrandPlaceholder("브랜드를 입력해주세요.");
  };

  // 키워드 입력하면
  const keyWordChange = (event) => {
    setKeyWord(event.target.value);
  };
  const keyWordFocus = () => {
    setKeyWordPlaceholder("");
  };
  const keyWordBlur = () => {
    setKeyWordPlaceholder("키워드를 입력해주세요.");
  };

  return (
    <Grid2 sx={{ padding: "0", display: "flex" }}>
      <Grid2
        xs={2}
        sx={{
          padding: "0",
          background: "#DADADA",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
          fontWeight: "600",
        }}
      >
        검색어
      </Grid2>
      <Grid2
        xs={10}
        sx={{
          padding: "0",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          display: "flex",
          alignContent: "center",
        }}
      >
        <SearchBox>
          <HeaderBox>
            <Header>상품명</Header>
          </HeaderBox>
          <Input
            placeholder={namePlaceholder}
            onChange={nameChange}
            onFocus={nameFocus}
            onBlur={nameBlur}
          />
          <HeaderBox>
            <Header>브랜드명</Header>
          </HeaderBox>
          <Input
            placeholder={brandPlaceholder}
            onChange={brandChange}
            onFocus={brandFocus}
            onBlur={brandBlur}
          />
          <HeaderBox>
            <Header>키워드</Header>
          </HeaderBox>
          <Input
            placeholder={keyWordPlaceholder}
            onChange={keyWordChange}
            onFocus={keyWordFocus}
            onBlur={keyWordBlur}
          />
        </SearchBox>
      </Grid2>
    </Grid2>
  );
}
export const SearchContainer = styled.div`
  display: flex;
  margin: 0;
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const HeaderBox = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Header = styled.div`
  font-size: 1.3rem;
  font-weight: 800;
  margin-right: 1rem;
  padding-left: 5rem;
`;

const Input = styled.input`
  border: 0.1rem solid #000000;
  border-radius: 0.3rem;
  width: 15rem;
  height: 3rem;
  font-size: 1.3rem;

  &::placeholder {
    color: gray;
    font-size: 1rem;
    padding-left: 1rem;
  }
`;
