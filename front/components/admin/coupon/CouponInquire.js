import React, { useState } from "react";
import styled from "styled-components";
import AddCoupon from "./AddCoupon";
import CouponList from "./CouponList";
import CouponPeriod from "./CouponPeriod";
import { inquirecoupon } from "../../../pages/api/coupon";

// mui
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid2 from "@mui/material/Unstable_Grid2";

export default function CouponInquire() {
  // 대분류
  const [bigCategory, setBigCategory] = useState("");

  // 쿠폰명
  const [name, setName] = useState("");
  const [namePlaceholder, setNamePlaceholder] =
    useState("쿠폰명을 입력해주세요.");

  // 왼쪽 할인 금액
  const [leftSale, setLeftSale] = useState("");
  const [leftSalePlaceholder, setLeftSalePlaceholder] = useState("0");

  // 오른쪽 할인 금액
  const [rightSale, setRightSale] = useState("");
  const [rightSalePlaceholder, setRightSalePlaceholder] = useState("0");

  // 기준 기간
  const [standDate, setStandDate] = useState(0);

  // 시작 날짜
  const [startDate, setStartDate] = useState(new Date());
  // 마감 날짜
  const [endDate, setEndDate] = useState(new Date());

  // 쿠폰 리스트
  const [couponArray, setCouponArray] = useState([]);

  // 대분류 셀렉트 했을 때
  const handleChange = (event) => {
    setBigCategory(event.target.value);
  };

  // 쿠폰명 입력하면
  const nameChange = (event) => {
    setName(event.target.value);
  };
  const nameFocus = () => {
    setNamePlaceholder("");
  };
  const nameBlur = () => {
    setNamePlaceholder("쿠폰명을 입력해주세요.");
  };

  // 왼쪽 할인 금액 입력하면
  const leftSaleChange = (event) => {
    setLeftSale(event.target.value);
  };
  const leftSaleFocus = () => {
    setLeftSalePlaceholder("");
  };
  const leftSaleBlur = () => {
    setLeftSalePlaceholder("0");
  };

  // 오른쪽 할인 금액 입력하면
  const rightSaleChange = (event) => {
    setRightSale(event.target.value);
  };
  const rightSaleFocus = () => {
    setRightSalePlaceholder("");
  };
  const rightSaleBlur = () => {
    setRightSalePlaceholder("0");
  };

  const getCoupong = async () => {
    const c = await inquirecoupon();
    const c_lst = Object.entries(c.data);
    const tmp = [];
    // 조건 검사
    for (let i = 0; i < c_lst.length; i++) {
      // 카테고리 번호가 맞는지
      if (
        c_lst[i][1].available_categories_uid == bigCategory ||
        bigCategory == 0
      ) {
        // 쿠폰명을 포함하고 있는지
        if (c_lst[i][1].name.includes(name) == true || name == "") {
          // 할인금액을 포함하고 있는지
          if (
            (leftSale <= c_lst[i][1].discount_price &&
              c_lst[i][1].discount_price <= rightSale) ||
            (leftSale == 0 && rightSale == 0)
          ) {
            // 기준 기간에 따른 날짜를 측정
            // 기준기간 선택 안했을 때
            if (standDate === 0) {
              if (startDate <= endDate) {
                tmp.push(c_lst[i][1]);
              }
            }
            // 쿠폰사용일시
            else if (standDate === 1) {
              if (startDate <= c_lst[i][1].start_date) {
                tmp.push(c_lst[i][1]);
              }
            }
            // 쿠폰마감일시
            else if (standDate === 2) {
              if (c_lst[i][1].end_date <= endDate) {
                tmp.push(c_lst[i][1]);
              }
            }
          }
        }
      }
    }
    setCouponArray(tmp);
  };

  return (
    <Grid2 container spacing={2} sx={{ padding: "0", margin: "0" }}>
      {/* 카테고리 */}
      <Grid2
        xs={2}
        sx={{
          padding: "0",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          background: "#DADADA",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
          fontWeight: "600",
        }}
      >
        카테고리
      </Grid2>
      <Grid2
        xs={10}
        sx={{
          padding: "0",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          display: "flex",
          zIndex: "0",
          background: "white",
        }}
      >
        <CategoryBox>
          <FormControl sx={{ minWidth: 200, width: 300 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              대분류
            </InputLabel>
            <Select
              value={bigCategory}
              onChange={handleChange}
              label="대분류"
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
                // getContentAnchorEl: null,
              }}
              sx={{ border: 1, height: 50, borderRadius: 0 }}
            >
              {/* <MenuItem value="대분류">
                <em>대분류</em>
              </MenuItem> */}
              <MenuItem value={"1"}>식품</MenuItem>
              <MenuItem value={"2"}>생활/건강</MenuItem>
              <MenuItem value={"3"}>가구/인테리어</MenuItem>
              <MenuItem value={"4"}>반려/도서/취미</MenuItem>
              <MenuItem value={"5"}>뷰티</MenuItem>
              <MenuItem value={"6"}>유아동</MenuItem>
              <MenuItem value={"7"}>가전</MenuItem>
              <MenuItem value={"8"}>스포츠/레저/자동차</MenuItem>
            </Select>
          </FormControl>
        </CategoryBox>
      </Grid2>
      <Grid2
        xs={12}
        sx={{
          margin: "0",
          padding: "0",
          width: "100%",
        }}
      >
        <hr style={{ background: "#ff9494", margin: "0", padding: "0" }} />
      </Grid2>
      {/* 쿠폰명 */}
      <Grid2
        xs={2}
        sx={{
          padding: "0",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          background: "#DADADA",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
          fontWeight: "600",
        }}
      >
        쿠폰명
      </Grid2>
      <Grid2
        xs={10}
        sx={{
          padding: "0",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          display: "flex",
          zIndex: "0",
          background: "white",
        }}
      >
        <Input
          placeholder={namePlaceholder}
          onChange={nameChange}
          onFocus={nameFocus}
          onBlur={nameBlur}
        />
      </Grid2>
      <Grid2
        xs={12}
        sx={{
          margin: "0",
          padding: "0",
          width: "100%",
        }}
      >
        <hr style={{ background: "#ff9494", margin: "0", padding: "0" }} />
      </Grid2>
      {/* 할인 금액 */}
      <Grid2
        xs={2}
        sx={{
          padding: "0",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          background: "#DADADA",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
          fontWeight: "600",
        }}
      >
        할인 금액
      </Grid2>
      <Grid2
        xs={10}
        sx={{
          padding: "0",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          display: "flex",
          zIndex: "0",
          background: "white",
        }}
      >
        <SaleInput
          placeholder={leftSalePlaceholder}
          onChange={leftSaleChange}
          onFocus={leftSaleFocus}
          onBlur={leftSaleBlur}
        />
        <WaveTag>~</WaveTag>
        <SaleInput
          style={{ margin: "0" }}
          placeholder={rightSalePlaceholder}
          onChange={rightSaleChange}
          onFocus={rightSaleFocus}
          onBlur={rightSaleBlur}
        />
      </Grid2>
      <Grid2
        xs={12}
        sx={{
          margin: "0",
          padding: "0",
          width: "100%",
        }}
      >
        <hr style={{ background: "#ff9494", margin: "0", padding: "0" }} />
      </Grid2>
      {/* 조회 기간 */}
      <Grid2
        xs={12}
        sx={{
          margin: "0",
          padding: "0",
          width: "100%",
        }}
      >
        <CouponPeriod
          setStandDate={setStandDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </Grid2>
      <Grid2
        xs={12}
        sx={{
          margin: "0",
          padding: "0",
          width: "100%",
        }}
      >
        <hr style={{ background: "#ff9494", margin: "0", padding: "0" }} />
      </Grid2>
      <Grid2
        xs={12}
        sx={{
          margin: "0",
          marginBottom: "2rem",
          padding: "0",
          width: "100%",
          background: "white",
        }}
      >
        <ButtonBox>
          <ResetButton>초기화</ResetButton>
          <SearchButton onClick={getCoupong}>검색</SearchButton>
        </ButtonBox>
      </Grid2>
      <Grid2
        container
        spacing={2}
        sx={{ padding: "0", margin: "0", width: "100%" }}
      >
        <Grid2
          item
          xs={7.4}
          sx={{
            margin: "0",
            padding: "0",
            background: "white",
          }}
        >
          {/* 조회한 쿠폰 리스트 */}
          <CouponList couponArray={couponArray} />
        </Grid2>
        <Grid2
          item
          xs={0.3}
          sx={{
            margin: "0",
            padding: "0",
          }}
        />
        <Grid2
          item
          xs={4.3}
          sx={{
            margin: "0",
            padding: "0",
          }}
        >
          {/* 쿠폰 등록 */}
          <AddCoupon />
        </Grid2>
      </Grid2>
    </Grid2>
  );
}

const CategoryBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5rem;
`;

const Input = styled.input`
  border: 0.1rem solid #000000;
  width: 19rem;
  height: 3rem;
  font-size: 1.3rem;
  margin-left: 5rem;

  &::placeholder {
    color: gray;
    font-size: 1rem;
    padding-left: 1rem;
  }
`;

const SaleInput = styled.input`
  border: 0.1rem solid #000000;
  width: 19rem;
  height: 3rem;
  font-size: 1.3rem;
  margin-left: 5rem;
  text-align: end;
  padding-right: 1rem;

  &::placeholder {
    color: gray;
    font-size: 1rem;
    padding-left: 1rem;
  }
`;

const WaveTag = styled.div`
  font-size: 2rem;
  display: flex;
  align-items: center;
  margin-left: 2rem;
  margin-right: 2rem;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  padding-bottom: 2rem;
  background-color: white;
`;

const ResetButton = styled.button`
  background-color: #ffffff;
  color: black;
  border: 1px solid;
  height: 3rem;
  width: 6rem;
  font-size: 1.3rem;
  &:hover {
    cursor: pointer;
  }
`;

const SearchButton = styled.button`
  background-color: #57a9fb;
  color: white;
  border: 1px solid;
  margin-left: 1rem;
  height: 3rem;
  width: 7rem;
  font-size: 1.5rem;
  cursor: pointer;
`;
