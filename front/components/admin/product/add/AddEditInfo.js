import React, { useState } from "react";
import styled from "styled-components";

// mui
import Grid2 from "@mui/material/Unstable_Grid2";

export default function AddEditInfo(props) {
  // 상품명
  const [name, setName] = useState("");
  const [namePlaceholder, setNamePlaceholder] =
    useState("상품명을 입력해주세요.");

  // 할인율
  const [sale, setSale] = useState("");
  const [salePlaceholder, setSalePlaceholder] =
    useState("숫자만 입력해주세요. ex) 13");

  // 판매가
  const [price, setPrice] = useState("");
  const [pricePlaceholder, setPricePlaceholder] = useState(
    "숫자만 입력해주세요. ex) 19000"
  );

  // 배송비
  const [fee, setFee] = useState("");
  const [feePlaceholder, setFeePlaceholder] = useState(
    "숫자만 입력해주세요. ex) 3000"
  );

  // 상품명
  const nameChange = (event) => {
    setName(event.target.value);
    props.setName(event.target.value);
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
    props.setDiscountRate(event.target.value);
  };
  const saleFocus = () => {
    setSalePlaceholder("");
  };
  const saleBlur = () => {
    setSalePlaceholder("숫자만 입력해주세요. ex) 13");
  };

  // 판매가
  const priceChange = (event) => {
    setPrice(event.target.value);
    props.setPrice(event.target.value);
  };
  const priceFocus = () => {
    setPricePlaceholder("");
  };
  const priceBlur = () => {
    setPricePlaceholder("숫자만 입력해주세요. ex) 19000");
  };

  // 배송비
  const feeChange = (event) => {
    setFee(event.target.value);
    props.setDeliveryFee(event.target.value);
  };
  const feeFocus = () => {
    setFeePlaceholder("");
  };
  const feeBlur = () => {
    setFeePlaceholder("숫자만 입력해주세요. ex) 3000");
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
        <div>
          판매 정보
          <p
            style={{
              margin: 0,
              color: "red",
              fontSize: "0.9rem",
              marginTop: "0.5rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            (모두 기입)
          </p>
        </div>
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
              placeholder={namePlaceholder}
              onChange={nameChange}
              onFocus={nameFocus}
              onBlur={nameBlur}
              style={{ height: "3rem" }}
            />
            <TitleBox>
              <Title>할인</Title>
              <p style={{ margin: 0 }}>(%)</p>
            </TitleBox>
            <Input
              placeholder={salePlaceholder}
              onChange={saleChange}
              onFocus={saleFocus}
              // onFocus={c}
              onBlur={saleBlur}
            />
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
              placeholder={pricePlaceholder}
              onChange={priceChange}
              onFocus={priceFocus}
              onBlur={priceBlur}
            />
            <TitleBox>
              <Title>배송비</Title>
              <p style={{ margin: 0 }}>(원)</p>
            </TitleBox>
            <Input
              placeholder={feePlaceholder}
              onChange={feeChange}
              onFocus={feeFocus}
              onBlur={feeBlur}
            />
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
  margin-left: 5.5rem;
  width: 7rem;
`;

const Title = styled.div`
  font-size: 1.3rem;
  font-weight: 800;
`;

const Input = styled.input`
  border: 0.1rem solid #000000;
  width: 17rem;
  height: 3rem;
  font-size: 1.3rem;
  padding-left: 1rem;

  &::placeholder {
    color: gray;
    font-size: 1rem;
  }
`;
