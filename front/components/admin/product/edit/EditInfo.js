import React, { useState } from "react";
import styled from "styled-components";

// mui
import Grid2 from "@mui/material/Unstable_Grid2";

export default function EditInfo(props) {
  // 상품명
  const [name, setName] = useState(props.nameInfo);

  // 할인율
  const [sale, setSale] = useState(props.discountRateInfo);

  // 판매가
  const [price, setPrice] = useState(props.priceInfo);

  // 배송비
  const [fee, setFee] = useState(props.deliveryFeeInfo);

  // 상품명
  const nameChange = (event) => {
    setName(event.target.value);
    props.setName(event.target.value);
  };

  // 할인율
  const saleChange = (event) => {
    setSale(event.target.value);
    props.setDiscountRate(event.target.value);
  };

  // 판매가
  const priceChange = (event) => {
    setPrice(event.target.value);
    props.setPrice(event.target.value);
  };

  // 배송비
  const feeChange = (event) => {
    setFee(event.target.value);
    props.setDeliveryFee(event.target.value);
  };

  return (
    <Grid2 sx={{ padding: "0", display: "flex" }}>
      <Grid2
        xs={2}
        sx={{
          padding: "0",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          background: "#DADADA",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
          fontWeight: "600",
        }}
      >
        판매정보
      </Grid2>
      <Grid2
        container
        xs={10}
        sx={{
          padding: "0",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          display: "flex",
          alignContent: "center",
        }}
      >
        {/* 상품명, 할인 */}
        <Grid2
          xs={12}
          sx={{
            padding: "0",
            paddingTop: "1rem",
            paddingBottom: "1rem",
            display: "flex",
            alignContent: "center",
          }}
        >
          <InfoBox>
            <TitleBox>
              <Title>상품명</Title>
            </TitleBox>
            <Input
              value={name}
              onChange={nameChange}
              style={{ height: "3rem", width: "15rem" }}
            />
            <TitleBox style={{ width: "7rem" }}>
              <Title>할인</Title>
              <p style={{ margin: 0 }}>(%)</p>
            </TitleBox>
            <Input value={sale} onChange={saleChange} />
          </InfoBox>
        </Grid2>
        {/* 판매가, 배송비 */}
        <Grid2
          xs={12}
          sx={{
            padding: "0",
            paddingTop: "1rem",
            paddingBottom: "1rem",
            display: "flex",
            alignContent: "center",
          }}
        >
          <InfoBox>
            <TitleBox>
              <Title>대표가격</Title>
              <p style={{ margin: 0 }}>(원)</p>
            </TitleBox>
            <Input
              value={price}
              onChange={priceChange}
              style={{ height: "3rem", width: "15rem" }}
            />
            <TitleBox style={{ width: "7rem" }}>
              <Title>배송비</Title>
              <p style={{ margin: 0, padding: 0 }}>(원)</p>
            </TitleBox>
            <Input value={fee} onChange={feeChange} />
          </InfoBox>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}

const InfoBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: flex-end;
  margin-left: 2rem;
  width: 6.5rem;
  margin-right: 1rem;
`;

const Title = styled.div`
  font-size: 1.3rem;
  font-weight: 800;
`;

const Input = styled.input`
  border: 0.1rem solid #000000;
  width: 7rem;
  height: 3rem;
  font-size: 1.3rem;
  padding-left: 1rem;
  padding-right: 1rem;

  &::placeholder {
    color: gray;
    font-size: 1rem;
  }
`;
