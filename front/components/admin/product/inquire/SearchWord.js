import React, { useState } from "react";
import styled from "styled-components";
import { SearchTitle } from "./InquireProduct";

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
    <SearchContainer>
      <SearchTitle style={{ paddingLeft: "4rem", marginTop: "1rem" }}>
        검색어
      </SearchTitle>
      <BoxContainer>
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
        </SearchBox>
        <SearchBox>
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
      </BoxContainer>
    </SearchContainer>
  );
}
export const SearchContainer = styled.div`
  display: flex;
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
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

const Header = styled.div`
  font-size: 2rem;
  font-weight: 800;
  width: 8rem;
  padding-left: 3rem;
`;

const Input = styled.input`
  border: 0.1rem solid #ff9494;
  border-radius: 0.5rem;
  width: 15rem;
  height: 3rem;
  font-size: 1.3rem;

  &::placeholder {
    color: gray;
    font-size: 1rem;
    padding-left: 1rem;
  }
`;
