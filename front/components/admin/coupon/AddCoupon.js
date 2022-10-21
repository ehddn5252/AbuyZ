import React, { useState } from "react";
import styled from "styled-components";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MyDatePicker } from "../product/inquire/Period";
import "react-datepicker/dist/react-datepicker.css";

export default function AddCoupon() {
  // 쿠폰이름
  const [name, setName] = useState("");
  const [namePlaceholder, setNamePlaceholder] =
    useState("쿠폰 이름을 입력해주세요.");

  // 할인금액
  const [sale, setSale] = useState("");
  const [salePlaceholder, setSalePlaceholder] =
    useState("할인금액을 입력해주세요.");

  // 대분류
  const [category, setCategory] = useState("");

  // 시작 날짜
  const [startDate, setStartDate] = useState(new Date());
  // 마감 날짜
  const [endDate, setEndDate] = useState(new Date());

  // 상품명 입력하면
  const nameChange = (event) => {
    setName(event.target.value);
  };
  const nameFocus = () => {
    setNamePlaceholder("");
  };
  const nameBlur = () => {
    setNamePlaceholder("쿠폰 이름을 입력해주세요.");
  };

  // 브랜드 입력하면
  const saleChange = (event) => {
    setSale(event.target.value);
  };
  const saleFocus = () => {
    setSalePlaceholder("");
  };
  const saleBlur = () => {
    setSalePlaceholder("할인금액을 입력해주세요.");
  };

  // 대분류 셀렉트 했을 때
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <AddCouponBox>
      <h1 style={{ paddingLeft: "2rem" }}>쿠폰 등록</h1>
      <hr style={{ background: "#ff9494", width: "95%" }}></hr>
      <ContentBox>
        <ContentTitle>쿠폰 이름</ContentTitle>
        <Input
          placeholder={namePlaceholder}
          onChange={nameChange}
          onFocus={nameFocus}
          onBlur={nameBlur}
        />
      </ContentBox>
      <ContentBox>
        <ContentTitle>쿠폰 시작 일자</ContentTitle>
        <MyDatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          // endDate={endDate}
          dateFormat="yyyy/MM/dd"
        />
      </ContentBox>
      <ContentBox>
        <ContentTitle>쿠폰 마감 일자</ContentTitle>
        <MyDatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          style={{ width: "40%" }}
          dateFormat="yyyy/MM/dd"
        />
      </ContentBox>
      <ContentBox>
        <ContentTitle>쿠폰 대상 카테고리</ContentTitle>
        <FormControl sx={{ m: 1, minWidth: 100, width: 200 }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            대분류
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={category}
            onChange={handleChange}
            autoWidth
            label="카테고리"
          >
            <MenuItem value={"전체"}>전체</MenuItem>
            <MenuItem value={"식품"}>식품</MenuItem>
            <MenuItem value={"생활, 건강"}>생활/건강</MenuItem>
            <MenuItem value={"가구, 인테리어"}>가구/인테리어</MenuItem>
            <MenuItem value={"반려, 도서, 취미"}>반려/도서/취미</MenuItem>
            <MenuItem value={"뷰티"}>뷰티</MenuItem>
          </Select>
        </FormControl>
      </ContentBox>
      <ContentBox>
        <ContentTitle>쿠폰 할인금액</ContentTitle>
        <Input
          placeholder={salePlaceholder}
          onChange={saleChange}
          onFocus={saleFocus}
          onBlur={saleBlur}
        />
      </ContentBox>
      <ContentBox style={{ justifyContent: "flex-end", marginRight: "4rem" }}>
        <DeleteButton>취소</DeleteButton>
        <EditButton>등록</EditButton>
      </ContentBox>
    </AddCouponBox>
  );
}

const AddCouponBox = styled.div`
  border: 0.3rem solid #ff9494;
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
`;

const ContentBox = styled.div`
  font-weight: 600;
  font-size: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-left: 4rem;
  display: flex;
`;

const ContentTitle = styled.div`
  width: 10%;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  border: 0.1rem solid #ff9494;
  border-radius: 0.5rem;
  width: 15rem;
  height: 2rem;
  font-size: 1.3rem;

  &::placeholder {
    color: gray;
    font-size: 1rem;
    padding-left: 1rem;
  }
`;

const DeleteButton = styled.button`
  background-color: #ffffff;
  color: gray;
  border: 1px solid;
  border-radius: 0.8rem;
  height: 2rem;
  width: 3rem;
  font-size: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

const EditButton = styled.button`
  background-color: #ff7171;
  color: white;
  border: 1px solid;
  border-radius: 0.8rem;
  margin-left: 1rem;
  height: 2rem;
  width: 5rem;
  font-size: 1rem;
  &:hover {
    cursor: pointer;
  }
`;
