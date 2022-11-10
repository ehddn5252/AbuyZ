// React
import React, { useState, useEffect } from "react";

// MUI
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
// import Checkbox from "@mui/material/Checkbox";
// StyledComponent
import styled from "styled-components";
// Calender
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// API
import { BigCategory } from "../../../pages/api/category";
import { bigSmallCategory } from "../../../pages/api/category";

export default function ReviewCategory({
  setReviewSearch,
  setSearchDto,
  buttonClick,
}) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [bigCategoryUid, setBigCategoryUid] = useState(0);
  const [smallCategoryUid, setSmallCategoryUid] = useState(0);
  const [bigCate, setBigCate] = useState({
    uid: 0,
    categoryName: "",
  });

  /**
   * 카테고리
   */

  const [bigCategory, setbigCategory] = useState([
    {
      uid: 0,
      categoryName: "",
    },
  ]);
  const [smallCategory, setSmallCategory] = useState([
    {
      uid: 0,
      categoryName: "",
    },
  ]);

  const loadBigCategory = async () => {
    const res = await BigCategory();
    setbigCategory(res.data);
    console.log("loadBigCategory", res.data);
  };

  const loadSmallCategory = async () => {
    const res = await bigSmallCategory(bigCategoryUid);
    setSmallCategory(res.data);
    console.log("loadSmallCategory", res.data);
  };

  useEffect(() => {
    loadBigCategory();
  }, []);

  useEffect(() => {
    console.log("====================================");
    console.log("bigCategoryUid", bigCate.uid);
    console.log("====================================");
    loadSmallCategory();
  }, [bigCate]);

  // const inquiryBigList = () => [
  //   { label: "대분류" },
  //   { label: "식품" },
  //   { label: "생활, 건강" },
  //   { label: "가구, 인테리어" },
  //   { label: "반려, 도서, 취미" },
  //   { label: "뷰티" },
  //   { label: "유아동" },
  //   { label: "가전" },
  //   { label: "스포츠, 레저, 자동차" },
  // ];
  // const inquirySmallList = () => [
  //   { label: "소분류" },
  //   { label: "상품문의" },
  //   { label: "이벤트 프로모션" },
  //   { label: "주문, 결제" },
  //   { label: "" },
  // ];

  const dateList = () => [{ label: "전체" }, { label: "리뷰작성일시" }];

  const searchButton = () => {
    setReviewSearch(true);
    buttonClick();
    console.log("buttonClick@@@@@@@@@@@@@@@");
  };

  const resetButton = () => {
    setReviewSearch(false);
  };

  // searchdto 변경
  const handleChange = (e) => {
    // console.log("handleChange", e.target.name);
    setSearchDto((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    setSearchDto((prevState) => ({
      ...prevState,
      startDate: startDate,
      endDate: endDate,
    }));
  }, [startDate, endDate]);

  return (
    <Container>
      <SearchBox>
        <ColumnBox>
          <TitleDiv>
            <p style={{ margin: 0 }}>카테고리</p>
          </TitleDiv>
          <CategoryDiv>
            <Autocomplete
              name="bigCategoryUid"
              disablePortal
              size="small"
              value={(category) => category.uid}
              options={bigCategory}
              getOptionLabel={(category) => category.categoryName}
              sx={{ width: 400, paddingLeft: "2rem" }}
              renderInput={(params) => <TextField {...params} />}
              defaultValue="대분류"
              onInputChange={(e) => setBigCate(e.target.value)}
            />
            <Autocomplete
              name="smallCategoryUid"
              disablePortal
              size="small"
              options={smallCategory}
              getOptionLabel={(category) => category.categoryName}
              sx={{ width: 400, paddingLeft: "2rem" }}
              renderInput={(params) => <TextField {...params} />}
              defaultValue="소분류"
            />
          </CategoryDiv>
        </ColumnBox>
        <ColumnBox>
          <TitleDiv>
            <p style={{ margin: 0 }}>제품명</p>
          </TitleDiv>
          <CategoryDiv>
            <TextField
              size="small"
              sx={{ width: 400, paddingLeft: "2rem" }}
              name="productName"
              onChange={handleChange}
            />
          </CategoryDiv>
        </ColumnBox>
        <ColumnBox>
          <TitleDiv>
            <p style={{ margin: 0 }}>기간</p>
          </TitleDiv>
          <DateDiv>
            <Autocomplete
              disablePortal
              options={dateList()}
              size="small"
              sx={{ width: 400, paddingLeft: "2rem" }}
              renderInput={(params) => <TextField {...params} />}
              defaultValue="전체"
            />
            <CalendarDiv>
              <MyDatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                dateFormat="yyyy-MM-dd"
              />
              <MyDatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsStart
                startDate={endDate}
                dateFormat="yyyy-MM-dd"
              />
            </CalendarDiv>
          </DateDiv>
        </ColumnBox>
        <ColumnBox>
          <TitleDiv>
            <p style={{ margin: 0 }}>리뷰 내용</p>
          </TitleDiv>
          <CategoryDiv>
            <TextField
              size="small"
              sx={{ width: 400, paddingLeft: "2rem" }}
              name="content"
              onChange={handleChange}
            />
          </CategoryDiv>
        </ColumnBox>
        <ColumnBox>
          <TitleDiv>
            <p style={{ margin: 0 }}>답변유무</p>
          </TitleDiv>
          <CategoryDiv>
            {/* <Checkbox
              defaultChecked
              name="check"
              sx={{ paddingLeft: "2rem" }}
            />
            <p style={{ paddingRight: "2rem" }}>전체</p>
            <Checkbox name="check" />
            <p style={{ paddingRight: "2rem" }}>미답변</p>
            <Checkbox name="check" />
            <p style={{ paddingRight: "2rem" }}>답변완료</p> */}
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="0"
              name="isAnswered"
              onChange={handleChange}
            >
              <FormControlLabel value="0" control={<Radio />} label="전체" />
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="답변완료"
              />
              <FormControlLabel value="2" control={<Radio />} label="미답변" />
            </RadioGroup>
          </CategoryDiv>
        </ColumnBox>
        <ButtonDiv>
          <ResetButton onClick={resetButton}>초기화</ResetButton>
          <SearchButton onClick={searchButton}>검색</SearchButton>
        </ButtonDiv>
      </SearchBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: white;
`;

const ColumnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #c8c8c8;
`;

const TitleDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  width: 20%;
  height: 4.2rem;
  background-color: #dadada;
  font-size: 1.3rem;
`;

const CategoryDiv = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  height: 100%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: white;
`;

const DateDiv = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  height: 100%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: white;
`;

const CalendarDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 50%;
  height: 100%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: white;
`;

const MyDatePicker = styled(DatePicker)`
  width: 10rem;
  /* background-color: transparent; */
  border-color: #c4c4c4;
  height: 2rem;
  margin-left: 10rem;
  font-size: 1rem;
  font-weight: bold;
  color: black;
  border: 1px solid;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const ResetButton = styled.button`
  border: 1px solid black;
  background-color: white;
  margin-right: 1rem;
  padding: 1rem;
  width: 10%;
  font-weight: bold;
  cursor: pointer;
  font-size: 1.3rem;
`;

const SearchButton = styled.button`
  border: none;
  background-color: #57a9fb;
  font-size: 1.3rem;
  margin-left: 1rem;
  padding: 1rem;
  width: 10%;
  font-weight: bold;
  cursor: pointer;
  color: white;
`;
