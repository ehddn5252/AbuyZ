// React
import React, { useState, useEffect } from "react";

// MUI
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

// StyleComponent
import styled from "styled-components";

// 하위 컴포넌트
import ProductDetailInfo from "../../components/product/ProductDetailInfo";
import ProductReview from "../../components/product/ProductReview";
import ProductInfo from "../../components/product/ProductInfo";
import ExchangeReturn from "../../components/product/ExchangeReturn";

export default function Detail() {
  const [day, setDay] = useState("");

  useEffect(() => {
    let temp = new Date();
    setDate(temp.getDate());
  }, []);
  return (
    <Container>
      <div style={{ width: "55%" }}>
        <ProductInfo />
        <ShippingBox>
          <IconBox>
            <RocketLaunchIcon sx={{ fontSize: "8rem" }} />
          </IconBox>
          <SpippingInfo>
            <p>오늘 당일 발송 마감 14시</p>
            <p>오늘 구매 시 내일 10/14(금) 발송 예정</p>
            <p>
              10/15(토)에 상품 도착할 확률{" "}
              <span style={{ color: "#56A9F1", fontWeight: "1000" }}>98%</span>
            </p>
            <p style={{ fontSize: "1rem" }}>
              도서, 산간지역은 기본 배송비에 3000원이 추가됩니다.
            </p>
            <p style={{ fontSize: "1rem" }}>
              또한, 기본 배송에 3 ~ 5일 더 소요될 수 있습니다.
            </p>
          </SpippingInfo>
        </ShippingBox>
        <ButtonBox>
          <MoveButton>상세정보</MoveButton>
          <MoveButton>리뷰</MoveButton>
          <MoveButton>교환/반품 안내</MoveButton>
        </ButtonBox>
        <ProductDetailInfo />
        <hr />
        <ProductReview />
        <hr />
        <ExchangeReturn />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const ShippingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  border-radius: 2rem;
  width: 100%;
  height: 20%;
  background-color: rgba(86, 169, 241, 0.13);
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
`;

const SpippingInfo = styled.div`
  width: 80%;
  font-size: 1.3rem;
`;

const ButtonBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
`;

const MoveButton = styled.button`
  background-color: #fff;
  font-weight: 1000;
  border: none;
  width: 20%;
  height: 5rem;
  font-size: 1.6rem;
`;
