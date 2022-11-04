import React, { useState } from "react";
import styled from "@emotion/styled";
import ProductItem from "./ProductItem";
import Grid from "@mui/material/Grid";
import "react-dropdown/style.css";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
export default function ProductLIst({ productList }) {
  const inquiryList = () => [
    { label: "최근 등록 순" },
    { label: "가격 낮은 순" },
    { label: "가격 높은 순" },
    { label: "평점 높은 순" },
    { label: "리뷰 많은 순" },
  ];

  return (
    <div>
      {/* <Right>
        <Autocomplete
          size="small"
          options={inquiryList()}
          sx={{
            width: 220,
            paddingLeft: "2rem",
            fontSize: "0.8rem",
            color: "#737373",
          }}
          renderInput={(params) => <TextField {...params} />}
          defaultValue="최근 등록 순"
        />
      </Right> */}
      <Center>
        <Grid container>
          {productList.map((product, idx) => (
            <Grid key={idx} item xs={4} marginBottom={3}>
              <ProductItem product={product} />
            </Grid>
          ))}
        </Grid>
      </Center>
    </div>
  );
}

const Right = styled.div`
  display: flex;
  justify-content: end;
  margin-right: 2rem;
`;

const Center = styled.div`
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  width: 100%;
  margin-left: 2.5rem;
`;
