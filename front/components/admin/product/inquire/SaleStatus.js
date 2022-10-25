import React, { useState } from "react";
import styled from "styled-components";
import { SearchContainer } from "./SearchWord";
import { SearchTitle } from "./InquireProduct";

// mui
import Grid2 from "@mui/material/Unstable_Grid2";
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
    <Grid2 sx={{ padding: "0", display: "flex" }}>
      <Grid2
        xs={2}
        sx={{
          padding: "0",
          background: "#DADADA",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
          fontWeight: "600",
        }}
      >
        판매상태
      </Grid2>
      <Grid2
        xs={10}
        sx={{ padding: "1rem", paddingLeft: "1.5rem", display: "flex" }}
      >
        <Checkbox
          checked={total}
          onChange={totalChange}
          inputProps={{ "aria-label": "controlled" }}
          style={{ marginLeft: "3rem" }}
          sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
        />
        <Name>전체</Name>
        <Checkbox
          checked={sale}
          onChange={saleChange}
          inputProps={{ "aria-label": "controlled" }}
          style={{ marginLeft: "3rem" }}
          sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
        />
        <Name>판매중</Name>
        <Checkbox
          checked={soldOut}
          onChange={soldOutChange}
          inputProps={{ "aria-label": "controlled" }}
          style={{ marginLeft: "3rem" }}
          sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
        />
        <Name>판매완료</Name>
      </Grid2>
    </Grid2>
  );
}

const Name = styled.p`
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
`;
