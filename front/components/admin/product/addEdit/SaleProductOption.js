import React, { useState } from "react";
import styled from "styled-components";
import { ContainerBox } from "./SaleProductCategory";
import { ContentBox } from "./SaleProductCategory";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";

export default function SaleProductOption() {
  const [optionCount, setOptionCount] = useState([1]);

  const optionMinus = () => {
    if (optionCount.length > 1) {
      optionCount.pop();
      setOptionCount([...optionCount]);
    }
  };
  const optionPlus = () => {
    if (optionCount.length < 3) {
      setOptionCount([...optionCount, 1]);
    }
  };
  console.log(optionCount.length);

  return (
    <ContainerBox>
      <h1 style={{ paddingLeft: "2rem" }}>판매 정보</h1>
      <hr style={{ background: "#ff9494", width: "95%" }}></hr>
      <ContentBox>
        <Title>옵션 입력</Title>
        <OptionBox>
          <RowBox>
            <NameTitle>옵션명</NameTitle>
            <ValueTitle>옵션값</ValueTitle>
          </RowBox>
          {optionCount.map((data, idx) => (
            <RowBox key={idx}>
              <NameInput placeholder="예시 : 사이즈"></NameInput>
              <ValueInput placeholder="예시 : S, M, L ( , 로 구분)"></ValueInput>
              <IndeterminateCheckBoxIcon
                onClick={optionMinus}
                sx={{ fontSize: "3rem", color: "gray" }}
              />
              <AddBoxIcon
                onClick={optionPlus}
                sx={{ fontSize: "3rem", color: "#ff9494" }}
              />
            </RowBox>
          ))}
        </OptionBox>
      </ContentBox>
    </ContainerBox>
  );
}

const Title = styled.p`
  display: flex;
  align-items: flex-start;
  margin-right: 3rem;
  font-size: 2rem;
  font-weight: 1000;
`;

const OptionBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const RowBox = styled.div`
  display: flex;
  font-size: 1.5rem;
  width: 100%;
  padding-top: 1rem;
`;

const NameTitle = styled.div`
  width: 20%;
  margin-right: 2rem;
  padding-left: 1rem;
`;

const ValueTitle = styled.div`
  width: 70%;
`;

const NameInput = styled.input`
  border: 0.1rem solid #ff9494;
  border-radius: 0.3rem;
  width: 20%;
  height: 100%;
  font-size: 1.3rem;
  margin-right: 2rem;
  padding-left: 1rem;

  &::placeholder {
    color: gray;
    font-size: 1rem;
  }
`;

const ValueInput = styled.input`
  border: 0.1rem solid #ff9494;
  border-radius: 0.3rem;
  width: 64%;
  height: 100%;
  font-size: 1.3rem;
  padding-left: 1rem;

  &::placeholder {
    color: gray;
    font-size: 1rem;
  }
`;

const Minus = styled.button`
  border: 0.1rem solid #ff9494;
  width: 8%;
  margin-left: 1rem;
`;

const Plus = styled.button`
  border: 0.1rem solid #ff9494;
  width: 8%;
  margin-left: 1rem;
`;
