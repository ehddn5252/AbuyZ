import React, { useState } from "react";
import styled from "@emotion/styled";
import ProductItem from "./ProductItem";
import Grid from "@mui/material/Grid";
import "react-dropdown/style.css";
export default function ProductLIst() {
  const [currentValue, setCurrentValue] = useState("필터를 선택하세요");
  const [ShowOptions, setShowOptions] = useState(false);
  const handleOnChangeSelectValue = (e) => {
    const { innerText } = e.target;
    setCurrentValue(innerText);
  };
  return (
    <div>
      <Right>
        <SelectBox onClick={() => setShowOptions((prev) => !prev)}>
          <Label>{currentValue}</Label>
          <SelectOptions show={ShowOptions}>
            <Option onClick={handleOnChangeSelectValue}>가격 낮은 순</Option>
            <Option onClick={handleOnChangeSelectValue}>가격 높은 순</Option>
            <Option onClick={handleOnChangeSelectValue}>평점 높은 순</Option>
            <Option onClick={handleOnChangeSelectValue}>리뷰 많은 순</Option>
          </SelectOptions>
        </SelectBox>
      </Right>
      <Center>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <ProductItem />
          </Grid>
          <Grid item xs={4}>
            <ProductItem />
          </Grid>
          <Grid item xs={4}>
            <ProductItem />
          </Grid>
        </Grid>
      </Center>
    </div>
  );
}

const Right = styled.div`
  display: flex;
  justify-content: end;
  margin-right: 15rem;
  margin-top: 3rem;
`;

const Center = styled.div`
  margin-top: 5rem;
  display: flex;
  justify-content: center;
`;
const SelectBox = styled.div`
  position: relative;
  width: 200px;
  padding: 8px;
  border-radius: 12px;
  background-color: #ffffff;
  align-self: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  &::before {
    content: "⌵";
    position: absolute;
    top: 1px;
    right: 8px;
    color: #49c181;
    font-size: 20px;
  }
`;

const Label = styled.label`
  font-size: 14px;
  margin-left: 4px;
  text-align: center;
`;

const Option = styled.li`
  font-size: 14px;
  padding: 6px 8px;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #429efa;
  }
`;

const SelectOptions = styled.ul`
  position: absolute;
  list-style: none;
  top: 18px;
  left: 0;
  width: 100%;
  overflow: hidden;
  height: 115px;
  max-height: ${(props) => (props.show ? "none" : "0")};
  padding: 0;
  border-radius: 8px;
  border-color: black;
  background-color: white;
  color: black;
`;
