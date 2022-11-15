import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchSideNav from "../components/nav/SearchSideNav";
import ProductLIst from "../components/product/ProductLIst";

// API
import {
  keywordSearch,
  kwcdSearch,
  inquireProduct,
  conditionSearch,
} from "./api/product";

import { useRecoilState } from "recoil";
// State
import { searchName, bigCategoryValue, smallCategoryValue } from "../states";

export default function Search() {
  // option (필터링)
  const [feeOption, setFeeOption] = useState(null);
  const [priceOption, setPriceOption] = useState(null);
  const [categotyOption, setCategoryOption] = useState(null);
  const [startPrice, setStartPrice] = useState(null);
  const [endPrice, setEndPrice] = useState(null);

  const [searchValue, setSearchValue] = useRecoilState(searchName);
  const [bigCategory, setBigCategory] = useRecoilState(bigCategoryValue);
  const [smallCategory, setSmallCategory] = useRecoilState(smallCategoryValue);
  const [productList, setProductList] = useState([]);

  const getProductList = async () => {
    let res;
    if (searchValue) {
      const temp = await keywordSearch(searchValue);
      res = temp.data;
    } else if (bigCategory) {
      const detailDto = {
        big_categories_uid: bigCategory,
      };
      const temp1 = await conditionSearch(detailDto);
      res = temp1.data;
    } else if (smallCategory) {
      const detailDto = {
        small_categories_uid: smallCategory,
      };
      const temp1 = await conditionSearch(detailDto);
      res = temp1.data;
    } else if (!searchValue && !bigCategory && !smallCategory) {
      res = await inquireProduct();
    }
    console.log(res);
    let temp = [];
    for (let i = 0; i < res.length; i++) {
      if (res[i].status !== "SOLD_OUT") {
        temp.push(res[i]);
      }
    }
    setProductList(temp);
  };

  const filterProductList = async () => {
    const detailDto = {
      keyword: searchValue,
      big_categories_uid: bigCategory,
      small_categories_uid: smallCategory,
    };
    if (feeOption) {
      detailDto["delivery_fee_uid"] = feeOption;
    }
    if (priceOption) {
      detailDto["price_uid"] = priceOption;
    }
    if (categotyOption) {
      detailDto["big_categories_uid"] = categotyOption;
    }
    if (startPrice && endPrice) {
      detailDto["start_price"] = startPrice;
      detailDto["end_price"] = endPrice;
    }
    const res = await kwcdSearch(detailDto);
    let temp = [];
    for (let i = 0; i < res.data.length; i++) {
      if (res.data[i].status !== "SOLD_OUT") {
        temp.push(res.data[i]);
      }
    }
    setProductList(temp);
  };
  // 필터링 사용시 동작
  useEffect(() => {
    if (searchValue) {
      filterProductList();
    }
  }, [feeOption, priceOption, categotyOption, startPrice, endPrice]);

  // 초기 동작
  useEffect(() => {
    getProductList();
  }, []);

  // 검색 값 변동시 동작
  useEffect(() => {
    getProductList();
  }, [searchValue, bigCategory, smallCategory]);
  return (
    <Container>
      <h1>검색 결과</h1>
      <div style={{ display: "flex", width: "100%" }}>
        <SideDiv>
          <SearchSideNav
            setFeeOption={setFeeOption}
            setPriceOption={setPriceOption}
            setCategoryOption={setCategoryOption}
            setStartPrice={setStartPrice}
            setEndPrice={setEndPrice}
          />
        </SideDiv>
        <MainDiv>
          <ProductLIst productList={productList} />
        </MainDiv>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 55%;
  margin: 0 22%;
  margin-top: 2rem;
  min-height: 86vh;
`;

const SideDiv = styled.div`
  width: 20%;
`;

const MainDiv = styled.div`
  width: 80%;
`;
