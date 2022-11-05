import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import ProductItem from "./ProductItem";
import Grid from "@mui/material/Grid";
import "react-dropdown/style.css";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function ProductLIst({ productList }) {
  const options = [
    "최근 등록 순",
    "가격 낮은 순",
    "가격 높은 순",
    "평점 높은 순",
    "리뷰 많은 순",
  ];
  const [value, setValue] = useState("최근 등록 순");
  const [inputValue, setInputValue] = React.useState([]);

  // 가격 낮은순
  function getLowPrcie(arr) {
    let sortable = [];

    sortable = arr.sort(function (a, b) {
      return a.price - b.price;
    });
    return sortable;
  }

  // 가격 높은 순
  function getHighPrice(arr) {
    let sortable = [];

    sortable = arr.sort(function (a, b) {
      return a.price - b.price;
    });
    sortable.reverse();
    return sortable;
  }

  // 리뷰 많은 순
  function getReviewList(arr) {
    let sortable = [];

    sortable = arr.sort(function (a, b) {
      return a.reviewNum - b.reviewNum;
    });
    sortable.reverse();
    return sortable;
  }

  // 평점 높은 순
  function getRatingList(arr) {
    let sortable = [];

    sortable = arr.sort(function (a, b) {
      return a.reviewRate - b.reviewRate;
    });
    sortable.reverse();
    return sortable;
  }
  useEffect(() => {
    setInputValue(productList);
  }, []);
  useEffect(() => {
    if (productList.length >= 2) {
      if (value === "최근 등록 순") setInputValue(productList);
      else if (value === "가격 낮은 순") {
        setInputValue(getLowPrcie(productList));
      } else if (value === "가격 높은 순") {
        setInputValue(getHighPrice(productList));
      } else if (value === "리뷰 많은 순") {
        setInputValue(getReviewList(productList));
      } else setInputValue(getRatingList(productList));
    }
    console.log(inputValue);
  }, [value]);
  return (
    <div>
      <Right>
        <Autocomplete
          size="small"
          options={options}
          sx={{
            width: 220,
            paddingLeft: "2rem",
            fontSize: "0.8rem",
            color: "#737373",
          }}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
          defaultValue="최근 등록 순"
        />
      </Right>
      <Center>
        <Grid container>
          {inputValue.map((product, idx) => (
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
