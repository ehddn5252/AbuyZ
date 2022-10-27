// React
import React, { useState, useEffect } from "react";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// StyeldComponet
import styled from "styled-components";

export default function BasketPayment() {
  const [basketList, setBasketList] = useState([]);

  useEffect(() => {
    setBasketList([1]);
  }, []);
  return (
    <Container>
      {basketList.length ? (
        <ContainerDiv>
          <TopBox>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "0.5rem",
                color: "#4185ED",
              }}
            >
              <HomeOutlinedIcon fontSize="large" />
              <p style={{ margin: 0, fontWeight: "bold", fontSize: "1.2rem" }}>
                배송지
              </p>
            </div>
            <p style={{ margin: 0, fontWeight: "bold", fontSize: "1.2rem" }}>
              부산 남구 우암로 196, 삼성 청년 SW 아카데미 202호
            </p>
            <AddressButton>배송지 변경하기</AddressButton>
          </TopBox>
          <BottomBox>
            <PriceBox>
              <PriceDiv>
                <p style={{ color: "#aaaaaa" }}>상품금액</p>
                <p>67,400원</p>
              </PriceDiv>
              <SaleDiv>
                <p style={{ color: "#aaaaaa" }}>상품할인금액</p>
                <p>-8,350원</p>
              </SaleDiv>
              <SaleDiv>
                <p style={{ color: "#aaaaaa" }}>배송비</p>
                <p>3,000원</p>
              </SaleDiv>
            </PriceBox>
            <hr />
            <TotalPriceBox>
              <p>결제예정금액</p>
              <p style={{ color: "red" }}>59,050원</p>
            </TotalPriceBox>
            <OrderButton>주문하기</OrderButton>
          </BottomBox>
        </ContainerDiv>
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  width: 30%;
  height: 36rem;
  border: 1px solid #aaaaaa;
  border-radius: 1rem;
  overflow: hidden;
`;

const TopBox = styled.div`
  width: 100%;
  padding: 1.5rem;
  height: 12rem;
`;
const BottomBox = styled.div`
  width: 100%;
  height: 24rem;
  padding: 1.5rem;
  border-radius: 0 0 1rem 1rem;
  background-color: #ededed;
`;

const ContainerDiv = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
`;
const PriceBox = styled.div``;

const PriceDiv = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: bolder;
`;
const SaleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: bolder;
`;

const TotalPriceBox = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: bolder;
`;
const AddressButton = styled.button`
  width: 100%;
  height: 3rem;
  background-color: #fff;
  color: #56a9f1;
  font-weight: bolder;
  border: 1px solid #56a9f1;
  border-radius: 0.5rem;
  margin-top: 1rem;
  font-size: 1.3rem;
`;

const OrderButton = styled.button`
  width: 100%;
  height: 3rem;
  background-color: #56a9f1;
  color: white;
  font-weight: bolder;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.3rem;
  margin-top: 2rem;
  cursor: pointer;
`;
