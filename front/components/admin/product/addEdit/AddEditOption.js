import React, { useState } from "react";
import styled from "styled-components";

// mui
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import Grid2 from "@mui/material/Unstable_Grid2";

export default function SaleProductOption() {
  // 옵션 갯수
  const [optionCount, setOptionCount] = useState(2);

  // 옵션명 1
  const [optionName1, setOptionName1] = useState("");

  // 옵션값 1
  const [optionValue1, setOptionValue1] = useState([]);

  // 옵션명 2
  const [optionName2, setOptionName2] = useState("");

  // 옵션값 2
  const [optionValue2, setOptionValue2] = useState([]);

  // 옵션명 3
  const [optionName3, setOptionName3] = useState("");

  // 옵션값 3
  const [optionValue3, setOptionValue3] = useState([]);

  // 옵션 갯수 뺴기
  const optionMinus = () => {
    if (optionCount > 1) {
      setOptionCount(optionCount - 1);
    }
  };

  // 옵션 갯수 더하기
  const optionPlus = () => {
    if (optionCount < 3) {
      setOptionCount(optionCount + 1);
    }
  };

  // 옵션명 구하기 1
  const changeOptionName1 = (e) => {
    setOptionName1(e.target.value);
  };

  // 옵션값 구하기 1
  const changeOptionValue1 = (e) => {
    const value = e.target.value.split(",");
    for (let i = 0; i < value.length; i++) {
      value[i] = value[i].trim();
    }
    setOptionValue1(value);
  };

  // 옵션명 구하기 2
  const changeOptionName2 = (e) => {
    setOptionName2(e.target.value);
  };

  // 옵션값 구하기 2
  const changeOptionValue2 = (e) => {
    const value = e.target.value.split(",");
    for (let i = 0; i < value.length; i++) {
      value[i] = value[i].trim();
    }
    setOptionValue2(value);
  };

  // 옵션명 구하기 3
  const changeOptionName3 = (e) => {
    setOptionName3(e.target.value);
  };

  // 옵션값 구하기 3
  const changeOptionValue3 = (e) => {
    const value = e.target.value.split(",");
    for (let i = 0; i < value.length; i++) {
      value[i] = value[i].trim();
    }
    setOptionValue3(value);
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
        옵션
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
        <Grid2
          container
          xs={12}
          sx={{
            padding: "0",
            paddingTop: "1rem",
            paddingBottom: "1rem",
            display: "flex",
            alignContent: "center",
          }}
        >
          <RowBox>
            <NameTitle>옵션명</NameTitle>
            <ValueTitle>옵션값</ValueTitle>
          </RowBox>
        </Grid2>
        <Grid2
          container
          xs={12}
          sx={{
            padding: "0",
            paddingTop: "1rem",
            paddingBottom: "1rem",
            display: "flex",
            alignContent: "center",
          }}
        >
          {optionCount >= 1 ? (
            <RowBox>
              <NameInput
                placeholder="예시 : 사이즈"
                onChange={changeOptionName1}
              ></NameInput>
              <ValueInput
                placeholder="예시 : S, M, L ( , 로 구분)"
                onChange={changeOptionValue1}
              ></ValueInput>
              <IndeterminateCheckBoxIcon
                onClick={optionMinus}
                sx={{ fontSize: "3rem", color: "gray", marginLeft: "1rem" }}
              />
              <AddBoxIcon onClick={optionPlus} sx={{ fontSize: "3rem" }} />
            </RowBox>
          ) : null}
          {optionCount >= 2 ? (
            <RowBox>
              <NameInput
                placeholder="예시 : 사이즈"
                onChange={changeOptionName2}
              ></NameInput>
              <ValueInput
                placeholder="예시 : S, M, L ( , 로 구분)"
                onChange={changeOptionValue2}
              ></ValueInput>
              <IndeterminateCheckBoxIcon
                onClick={optionMinus}
                sx={{ fontSize: "3rem", color: "gray", marginLeft: "1rem" }}
              />
              <AddBoxIcon onClick={optionPlus} sx={{ fontSize: "3rem" }} />
            </RowBox>
          ) : null}
          {optionCount >= 3 ? (
            <RowBox>
              <NameInput
                placeholder="예시 : 사이즈"
                onChange={changeOptionName3}
              ></NameInput>
              <ValueInput
                placeholder="예시 : S, M, L ( , 로 구분)"
                onChange={changeOptionValue3}
              ></ValueInput>
              <IndeterminateCheckBoxIcon
                onClick={optionMinus}
                sx={{ fontSize: "3rem", color: "gray", marginLeft: "1rem" }}
              />
              <AddBoxIcon onClick={optionPlus} sx={{ fontSize: "3rem" }} />
            </RowBox>
          ) : null}
        </Grid2>
        <SearchButton>옵션 목록으로 적용</SearchButton>
      </Grid2>
    </Grid2>
  );
}

const RowBox = styled.div`
  display: flex;
  font-size: 1.5rem;
  width: 100%;
  padding-top: 1rem;
  margin-left: 5.5rem;
`;

const NameTitle = styled.div`
  width: 10%;
  font-size: 1.3rem;
  font-weight: 800;
  margin-right: 2rem;
`;

const ValueTitle = styled.div`
  width: 70%;
  font-size: 1.3rem;
  font-weight: 800;
  margin-left: 9rem;
`;

const NameInput = styled.input`
  border: 0.1rem solid #000000;
  width: 20%;
  height: 3rem;
  font-size: 1.3rem;
  margin-right: 2rem;
  padding-left: 1rem;

  &::placeholder {
    color: gray;
    font-size: 1rem;
  }
`;

const ValueInput = styled.input`
  border: 0.1rem solid #000000;
  width: 60%;
  height: 100%;
  font-size: 1.3rem;
  padding-left: 1rem;

  &::placeholder {
    color: gray;
    font-size: 1rem;
  }
`;

const SearchButton = styled.button`
  background-color: #57a9fb;
  color: white;
  border: 1px solid;
  margin: 1rem;
  height: 3rem;
  width: 15rem;
  font-size: 1rem;
  margin-left: 5rem;
  &:hover {
    cursor: pointer;
  }
`;
