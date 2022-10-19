import React, { useState } from "react";
import styled from "styled-components";
import { ContainerBox } from "./SaleProductCategory";

export default function SaleProductInfo() {
  // 상품명
  const [name, setName] = useState("");
  const [namePlaceholder, setNamePlaceholder] =
    useState("상품명을 입력해주세요.");
  // 할인
  const [sale, setSale] = useState("");
  const [salePlaceholder, setSalePlaceholder] =
    useState("할인율을 입력해주세요.");
  // 판매가
  const [price, setPrice] = useState("");
  const [pricePlaceholder, setPricePlaceholder] =
    useState("판매가를 입력해주세요.");
  // 할인
  const [fee, setFee] = useState("");
  const [feePlaceholder, setFeePlaceholder] =
    useState("배송비를 입력해주세요.");

  // 상품명
  const nameChange = (event) => {
    setName(event.target.value);
  };
  const nameFocus = () => {
    setNamePlaceholder("");
  };
  const nameBlur = () => {
    setNamePlaceholder("상품명을 입력해주세요.");
  };
  // 할인율
  const saleChange = (event) => {
    setSale(event.target.value);
  };
  const saleFocus = () => {
    setSalePlaceholder("");
  };
  const saleBlur = () => {
    setSalePlaceholder("할인율을 입력해주세요.");
  };
  // 판매가
  const priceChange = (event) => {
    setPrice(event.target.value);
  };
  const priceFocus = () => {
    setPricePlaceholder("");
  };
  const priceBlur = () => {
    setPricePlaceholder("판매가를 입력해주세요.");
  };
  // 배송비
  const feeChange = (event) => {
    setFee(event.target.value);
  };
  const feeFocus = () => {
    setFeePlaceholder("");
  };
  const feeBlur = () => {
    setFeePlaceholder("배송비를 입력해주세요.");
  };

  return (
    <ContainerBox>
      <h1 style={{ paddingLeft: "2rem" }}>판매 정보</h1>
      <hr style={{ background: "#ff9494", width: "95%" }}></hr>
      {/* 상품명, 할인 */}
      <SalesInfoBox>
        <InfoBox>
          <TitleBox>
            <Title>상품명</Title>
          </TitleBox>
          <InputContainer>
            <Input
              placeholder={namePlaceholder}
              onChange={nameChange}
              onFocus={nameFocus}
              onBlur={nameBlur}
              style={{ height: "3rem" }}
            />
          </InputContainer>
        </InfoBox>
        <InfoBox>
          <TitleBox>
            <Title>할인</Title>
            <p style={{ margin: 0 }}>(%)</p>
          </TitleBox>
          <InputContainer>
            <Input
              placeholder={salePlaceholder}
              onChange={saleChange}
              onFocus={saleFocus}
              onBlur={saleBlur}
            />
            <Description>0 ~ 100 까지 숫자만 입력해주세요.</Description>
          </InputContainer>
        </InfoBox>
      </SalesInfoBox>
      {/* 판매가, 배송비 */}
      <SalesInfoBox>
        <InfoBox>
          <TitleBox>
            <Title>판매가</Title>
            <p style={{ margin: 0 }}>(원)</p>
          </TitleBox>
          <InputContainer>
            <Input
              placeholder={pricePlaceholder}
              onChange={priceChange}
              onFocus={priceFocus}
              onBlur={priceBlur}
            />
            <Description>숫자만 입력해주세요. ex) 12000</Description>
          </InputContainer>
        </InfoBox>
        <InfoBox>
          <TitleBox>
            <Title>배송비</Title>
            <p style={{ margin: 0 }}>(원)</p>
          </TitleBox>
          <InputContainer>
            <Input
              placeholder={feePlaceholder}
              onChange={feeChange}
              onFocus={feeFocus}
              onBlur={feeBlur}
            />
            <Description>
              숫자만 입력해주세요. (0은 무료배송입니다.)
              <br />
              ex) 3000 or 0
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
  width: 7rem;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: 800;
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
