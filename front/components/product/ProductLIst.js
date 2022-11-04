import React, { useState } from "react";
import styled from "@emotion/styled";
import ProductItem from "./ProductItem";
import Grid from "@mui/material/Grid";
import "react-dropdown/style.css";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
export default function ProductLIst() {
  const inquiryList = () => [
    { label: "가격 낮은 순" },
    { label: "가격 높은 순" },
    { label: "평점 높은 순" },
    { label: "리뷰 많은 순" },
  ];
  const [productList, setProductList] = useState([
    {
      id: 0,
      product_name: "초이스엘 당근(100G)",
      sale_radio: 20,
      price: 800,
      review_count: 29235,
      review_score: 4.8,
    },
    {
      id: 1,
      product_name: "온리프라이스 Only Price 1등급 우유(930ML*2입)",
      sale_radio: 0,
      price: 3500,
      review_count: 291581,
      review_score: 4.9,
    },
    {
      id: 2,
      product_name: "초이스엘 감자 (900G)",
      sale_radio: 0,
      price: 3900,
      review_count: 18344,
      review_score: 4.6,
    },
  ]);

  return (
    <div>
      <Right>
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
          defaultValue="가격 낮은 순"
        />
      </Right>
      <Center>
        <Grid container>
          {productList.map((product) => (
            <Grid key={product.id} item xs={4} marginBottom={3}>
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
