// React
import React, { useState, useEffect } from "react";

// MUI
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

// StyeldComponet
import styled from "styled-components";
// API
import { getMyInfo } from "../../pages/api/user";

// Next.js
import { useRouter } from "next/router";

// State
import { basketProducts } from "../../states";
import { useRecoilState } from "recoil";

export default function BasketPayment() {
  const router = useRouter();
  const [basketList, setBasketList] = useRecoilState(basketProducts);
  const [address, setAddress] = useState(
    "녹산 송정동 1627-5 그린코어 오피스텔"
  );
  const [detailAddress, setDetailAddress] = useState("691호");

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalFee, setTotalFee] = useState(0);

  // 개인정보 조회
  const getName = async () => {
    const res = await getMyInfo();
    console.log(res);
    setAddress(res.data.address);
    setDetailAddress(res.data.detailAddress);
  };

  const goPayment = () => {
    router.push("/payment");
  };
  useEffect(() => {
    let ttotalPrice = 0;
    let ttotalDiscount = 0;
    let ttotalFee = 0;
    for (let i = 0; i < basketList.length; i++) {
      ttotalPrice +=
        basketList[i].productDto.price * basketList[i].productCount;
      ttotalDiscount +=
        ((basketList[i].productDto.price *
          basketList[i].productDto.discountRate) /
          100) *
        basketList[i].productCount;
      ttotalFee += basketList[i].productDto.deliveryFee;
    }
    setTotalDiscount(ttotalDiscount);
    setTotalFee(ttotalFee);
    setTotalPrice(ttotalPrice);
    getName();
  }, [basketList]);

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
            {address ? (
              <p style={{ margin: 0, fontWeight: "bold", fontSize: "1rem" }}>
                {address} {detailAddress}
              </p>
            ) : (
              <p style={{ margin: 0, fontWeight: "bold", fontSize: "1rem" }}>
                등록된 주소가 없습니다.
              </p>
            )}
          </TopBox>
          <BottomBox>
            <PriceBox>
              <PriceDiv>
                <p style={{ color: "#aaaaaa" }}>상품금액</p>
                <p>{totalPrice.toLocaleString("ko-KR")}원</p>
              </PriceDiv>
              <SaleDiv>
                <p style={{ color: "#aaaaaa" }}>상품할인금액</p>
                <p>-{totalDiscount.toLocaleString("ko-KR")}원</p>
              </SaleDiv>
              <SaleDiv>
                <p style={{ color: "#aaaaaa" }}>배송비</p>
                <p>{totalFee.toLocaleString("ko-KR")}원</p>
              </SaleDiv>
            </PriceBox>
            <hr />
            <TotalPriceBox>
              <p>결제예정금액</p>
              <p style={{ color: "#56a9f1", fontSize: "1.3rem" }}>
                {(totalPrice - totalDiscount + totalFee).toLocaleString(
                  "ko-KR"
                )}
                원
              </p>
            </TotalPriceBox>
            <OrderButton onClick={goPayment}>주문하기</OrderButton>
          </BottomBox>
        </ContainerDiv>
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  width: 25%;
  border: 1px solid #aaaaaa;
  border-radius: 1rem;
  height: 34rem;
  overflow: hidden;
`;

const TopBox = styled.div`
  width: 100%;
  padding: 1.5rem;
  height: 12rem;
`;
const BottomBox = styled.div`
  width: 100%;
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
  font-size: 1rem;
  font-weight: bolder;
`;

const TotalPriceBox = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: bolder;
  vertical-align: center;
`;
const AddressButton = styled.button`
  width: 100%;
  height: 2.5rem;
  background-color: #fff;
  color: #56a9f1;
  font-weight: bolder;
  border: 1px solid #56a9f1;
  border-radius: 0.5rem;
  margin-top: 1rem;
  font-size: 1rem;
`;

const OrderButton = styled.button`
  width: 100%;
  height: 2.5rem;
  background-color: #56a9f1;
  color: white;
  font-weight: bolder;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.3rem;
  margin-top: 2rem;
  cursor: pointer;
`;
