import React, { useState } from "react";
import styled from "styled-components";
import { SearchContainer } from "./SearchWord";
import { SearchTitle } from "./InquireProduct";
import Checkbox from "@mui/material/Checkbox";

export default function SaleStatus() {
  // 전체
  const [total, setTotal] = useState(false);
  // 판매 중
  const [sale, setSale] = useState(false);
  // 판매완료
  const [soldOut, setSoldOut] = useState(false);

  const totalChange = (event) => {
    setTotal(event.target.checked);
  };

  const saleChange = (event) => {
    setSale(event.target.checked);
  };

  const soldOutChange = (event) => {
    setSoldOut(event.target.checked);
  };

  return (
    <SearchContainer>
      <SearchTitle style={{ paddingLeft: "4rem", marginTop: "1rem" }}>
        판매상태
      </SearchTitle>
      <Checkbox
        checked={total}
        onChange={totalChange}
        inputProps={{ "aria-label": "controlled" }}
        style={{ marginLeft: "3rem" }}
        sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
      />
      <Name>전체</Name>
      <Checkbox
        checked={sale}
        onChange={saleChange}
        inputProps={{ "aria-label": "controlled" }}
        style={{ marginLeft: "3rem" }}
        sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
      />
      <Name>판매 중</Name>
      <Checkbox
        checked={soldOut}
        onChange={soldOutChange}
        inputProps={{ "aria-label": "controlled" }}
        style={{ marginLeft: "3rem" }}
        sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
      />
      <Name>판매완료</Name>
    </SearchContainer>
  );
}

const Name = styled.p`
  font-size: 2rem;
  font-weight: 1000;
`;
