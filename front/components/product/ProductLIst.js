// React
import React, { useState, useEffect } from "react";

// StyledComponent
import styled from "styled-components";

// 하위 Component
import ProductItem from "./ProductItem";

// MUI
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

// Next.js
import { useRouter } from "next/router";

import { useRecoilState } from "recoil";
// State
import { filterName } from "../../states/index";

export default function ProductLIst({ productList }) {
  const router = useRouter();
  const options = [
    "최근 등록 순",
    "가격 낮은 순",
    "가격 높은 순",
    "평점 높은 순",
    "리뷰 많은 순",
  ];
  const [value, setValue] = useRecoilState(filterName);
  const [inputValue, setInputValue] = useState([productList]);
  // 가격 낮은순
  function getLowPrcie(arr) {
    let sortable = [];

    sortable = arr.sort(function (a, b) {
      return a.price - b.price;
    });
    sortable.reverse();
    return sortable;
  }
  function getCreatePrcie(arr) {
    let sortable = [];

    sortable = arr.sort(function (a, b) {
      return a.uid - b.uid;
    });
    sortable.reverse();
    return sortable;
  }
  // 가격 높은 순
  function getHighPrice(arr) {
    let sortable = [];

    sortable = arr.sort(function (a, b) {
      return a.price - b.price;
    });
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

  // 필터링 클릭시
  const change = () => {
    let data;
    if (productList.length >= 1) {
      if (value === "최근 등록 순") {
        data = getCreatePrcie(productList);
      } else if (value === "가격 낮은 순") {
        data = getLowPrcie(productList);
      } else if (value === "가격 높은 순") {
        data = getHighPrice(productList);
      } else if (value === "리뷰 많은 순") {
        data = getReviewList(productList);
      } else data = getRatingList(productList);
    }
    return data;
  };

  useEffect(() => {
    const tv = change();

    setInputValue(tv);
  }, [inputValue, value, productList]);
  return productList ? (
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
          {inputValue &&
            inputValue.map((product, idx) => (
              <Grid key={idx} item xs={4} marginBottom={3}>
                <ProductItem product={product} />
              </Grid>
            ))}
        </Grid>
      </Center>
    </div>
  ) : null;
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
