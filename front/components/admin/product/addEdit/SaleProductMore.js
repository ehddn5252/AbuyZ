import React, { useState } from "react";
import styled from "styled-components";
import { ContainerBox } from "./SaleProductCategory";

export default function SaleProductMore() {
  // 브랜드
  const [brand, setBrand] = useState("");
  const [brandPlaceholder, setBrandPlaceholder] =
    useState("브랜드를 입력해주세요.");
  // 키워드
  const [keyWord, setKeyWord] = useState("");
  const [keyWordPlaceholder, setKeyWordPlaceholder] =
    useState("키워드를 입력해주세요.");
  // 메타태그
  const [metaTag, setMetaTag] = useState("");
  const [metaTagPlaceholder, setMetaTagPlaceholder] =
    useState("메타태그를 입력해주세요.");

  // 브랜드
  const brandChange = (event) => {
    setBrand(event.target.value);
  };
  const brandFocus = () => {
    setBrandPlaceholder("");
  };
  const brandBlur = () => {
    setBrandPlaceholder("브랜드를 입력해주세요.");
  };
  // 키워드
  const keyWordChange = (event) => {
    setKeyWord(event.target.value);
  };
  const keyWordFocus = () => {
    setKeyWordPlaceholder("");
  };
  const keyWordBlur = () => {
    setKeyWordPlaceholder("키워드를 입력해주세요.");
  };
  // 메타태그
  const metaTagChange = (event) => {
    setMetaTag(event.target.value);
  };
  const metaTagFocus = () => {
    setMetaTagPlaceholder("");
  };
  const metaTagBlur = () => {
    setMetaTagPlaceholder("메타태그를 입력해주세요.");
  };

  return (
    <ContainerBox>
      <h1 style={{ paddingLeft: "2rem" }}>판매 정보</h1>
      <hr style={{ background: "#ff9494", width: "95%" }}></hr>
      {/* 브랜드, 키워드 */}
      <SalesInfoBox>
        <InfoBox>
          <TitleBox>
            <Title>브랜드</Title>
          </TitleBox>
          <InputContainer>
            <Input
              placeholder={brandPlaceholder}
              onChange={brandChange}
              onFocus={brandFocus}
              onBlur={brandBlur}
              style={{ height: "3rem" }}
            />
          </InputContainer>
        </InfoBox>
        <InfoBox>
          <TitleBox>
            <Title>키워드</Title>
          </TitleBox>
          <InputContainer>
            <Input
              placeholder={keyWordPlaceholder}
              onChange={keyWordChange}
              onFocus={keyWordFocus}
              onBlur={keyWordBlur}
            />
            <Description>ex) 최고, 가성비 ( , 로 구분)</Description>
          </InputContainer>
        </InfoBox>
      </SalesInfoBox>
      {/* 메타태그 */}
      <SalesInfoBox>
        <InfoBox>
          <TitleBox>
            <Title>메타태그</Title>
          </TitleBox>
          <InputContainer>
            <Input
              placeholder={metaTagPlaceholder}
              onChange={metaTagChange}
              onFocus={metaTagFocus}
              onBlur={metaTagBlur}
            />
            <Description>
              상품을 공유할 때 소개할 수 있는 단어 <br /> ex) 사과, 청바지 ( ,
              로 구분)
            </Description>
          </InputContainer>
        </InfoBox>
      </SalesInfoBox>
    </ContainerBox>
  );
}

const SalesInfoBox = styled.div`
  display: flex;
  margin-left: 4rem;
`;

const InfoBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: flex-end;
  margin-right: 2rem;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: 800;
  width: 8rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 50%;
`;

const Input = styled.input`
  border: 0.1rem solid #ff9494;
  border-radius: 0.5rem;
  width: 15rem;
  height: 7rem;
  padding-left: 0.5rem;
  font-size: 1.3rem;

  &::placeholder {
    color: gray;
    font-size: 1rem;
  }
`;

const Description = styled.div`
  font-size: 0.9rem;
  padding-top: 0.5rem;
  padding-left: 0.8rem;
  color: gray;
`;
