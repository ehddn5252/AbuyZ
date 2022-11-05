import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchSideNav from "../components/nav/SearchSideNav";
import ProductLIst from "../components/product/ProductLIst";

// API
import { keywordSearch, kwcdSearch } from "./api/product";

import { useRecoilState } from "recoil";
// State
import { searchName } from "../states";
export default function Search() {
  const [searchValue, setSearchValue] = useRecoilState(searchName);
  const [productList, setProductList] = useState([]);

  // option (필터링)
  const [feeOption, setFeeOption] = useState(null);
  const [priceOption, setPriceOption] = useState(null);
  const [categotyOption, setCategoryOption] = useState(null);
  const [startPrice, setStartPrice] = useState(null);
  const [endPrice, setEndPrice] = useState(null);

  const getProductList = async () => {
    const res = await keywordSearch(searchValue);
    setProductList(res.data);
  };

  const filterProductList = async () => {
    const detailDto = {
      keyword: searchValue,
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
    setProductList(res.data);
  };
  // 검색 값 변동시 동작
  useEffect(() => {
    getProductList();
  }, [searchValue]);

  // 필터링 사용시 동작
  useEffect(() => {
    console.log(feeOption, priceOption, categotyOption, startPrice, endPrice);
    filterProductList();
  }, [feeOption, priceOption, categotyOption, startPrice, endPrice]);
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
