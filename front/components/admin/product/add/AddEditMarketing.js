import React, { useState } from "react";
import styled from "styled-components";

// mui
import Grid2 from "@mui/material/Unstable_Grid2";

export default function AddEditMarketing(props) {
  // 브랜드
  const [brand, setBrand] = useState("");
  const [brandPlaceholder, setBrandPlaceholder] =
    useState("브랜드를 입력해주세요.");
  // 키워드
  const [keyWord, setKeyWord] = useState("");
  const [keyWordPlaceholder, setKeyWordPlaceholder] =
    useState("키워드를 입력해주세요.");

  // 브랜드
  const brandChange = (event) => {
    setBrand(event.target.value);
    props.setBrandName(event.target.value);
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
    props.setKeywords(event.target.value);
  };
  const keyWordFocus = () => {
    setKeyWordPlaceholder("");
  };
  const keyWordBlur = () => {
    setKeyWordPlaceholder("키워드를 입력해주세요.");
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
          마케팅 정보
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
              placeholder={brandPlaceholder}
              onChange={brandChange}
              onFocus={brandFocus}
              onBlur={brandBlur}
              style={{ height: "3rem" }}
            />
            <TitleBox>
              <Title>키워드</Title>
            </TitleBox>
            <Input
              placeholder={keyWordPlaceholder}
              onChange={keyWordChange}
              onFocus={keyWordFocus}
              onBlur={keyWordBlur}
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
