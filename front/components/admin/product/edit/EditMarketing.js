import React, { useState } from "react";
import styled from "styled-components";

// mui
import Grid2 from "@mui/material/Unstable_Grid2";

export default function EditMarketing(props) {
  // 브랜드
  const [brand, setBrand] = useState(props.brandName);

  // 키워드
  const [keyWord, setKeyWord] = useState(props.keywords.join(", "));

  // 브랜드
  const brandChange = (event) => {
    setBrand(event.target.value);
    props.setBrandName(event.target.value);
  };

  // 키워드
  const keyWordChange = (event) => {
    setKeyWord(event.target.value);
    props.setKeywords(event.target.value);
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
        마케팅 정보
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
        {/* 브랜드, 키워드 */}
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
              <Title>브랜드</Title>
            </TitleBox>
            <Input
              value={brand}
              onChange={brandChange}
              style={{ height: "3rem" }}
            />
            <TitleBox>
              <Title>키워드</Title>
            </TitleBox>
            <Input value={keyWord} onChange={keyWordChange} />
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
  width: 5rem;
`;

const Title = styled.div`
  font-size: 1.3rem;
  font-weight: 800;
`;

const Input = styled.input`
  border: 0.1rem solid #000000;
  width: 13rem;
  height: 3rem;
  font-size: 1.3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  &::placeholder {
    color: gray;
    font-size: 1rem;
  }
`;
