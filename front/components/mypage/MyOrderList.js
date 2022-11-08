// React
import React, { useEffect, useState } from "react";

// MUI
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Button from "@mui/material/Button";

// StyledComponents
import styled from "styled-components";

// api
import { getOrderList } from "../../pages/api/order";

// 하위 Components
import MyOrderItem from "./MyOrderItem";

export default function MyOrderList() {
  // 장바구니 별 리스트
  const [orderBundle, setOrderBundle] = useState([]);

  // 결제 목록 불러오기
  const bundle = async () => {
    const res = await getOrderList();
    res.data.sort((a, b) => b.uid - a.uid);
    setOrderBundle(res.data);
  };
  useEffect(() => {
    bundle();
  }, []);

  return (
    <MyOrderContainer>
      <MajorTitle>주문 내역</MajorTitle>
      <Hr />
      <div style={{ display: "flex", justifyContent: "end" }}>
        {/* <span>총 주문 상품 건수: {productList.length}건</span> */}
      </div>

      {orderBundle.length === 0 ? (
        <BlankBox>
          <ShoppingCartOutlinedIcon
            sx={{ fontSize: "4rem", color: "rgb(86, 169, 241,0.7)" }}
          />
          <p style={{ fontSize: "2rem", color: "rgb(86, 169, 241,0.7)" }}>
            구매하신 상품이 없습니다
          </p>
        </BlankBox>
      ) : (
        <div>
          {orderBundle.map((e, idx) => (
            <div style={{ marginTop: "4rem" }}>
              <span style={{ color: "#aaaaaa", fontWeight: "bold" }}>
                주문 일시: {e.date.slice(0, 10)} {e.date.slice(11, 16)}
              </span>
              <div
                style={{
                  borderTop: "2px solid rgb(127, 127, 127, 0.5)",
                  padding: "2rem",
                  marginTop: "0.5rem",
                }}
                key={idx}
              >
                <MyOrderItem uid={e.uid} />
              </div>
            </div>
          ))}
        </div>
      )}
      {/* {productList.length < 4 ? null : (
        <ButtonDiv>
          <Button
            variant="contained"
            size="large"
            sx={{ borderRadius: "3rem" }}
          >
            더보기
          </Button>
        </ButtonDiv>
      )} */}
    </MyOrderContainer>
  );
}

const MyOrderContainer = styled.div`
  margin-top: 4rem;
  margin-bottom: 4rem;
  width: 100%;
  width: 56rem;
`;

const Hr = styled.hr`
  height: 0.3rem;
  background: #7895b2;
  border-radius: 1rem;
`;

const MajorTitle = styled.span`
  font-size: 2rem;
  margin-top: 1rem;
`;

const BlankBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30rem;
  font-size: 3rem;
  font-weight: bolder;
  color: #aaaaaa;
`;

const ProductListBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;
