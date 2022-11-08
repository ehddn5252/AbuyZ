// React
import React, { useState, useEffect } from "react";

// MUI

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
// StyledComponent
import styled from "styled-components";
// Calender
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function ReviewCategory({ setReviewSearch }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const inquiryBigList = () => [
    { label: "대분류" },
    { label: "식품" },
    { label: "이벤트 프로모션" },
    { label: "주문, 결제" },
  ];
  const inquirySmallList = () => [
    { label: "소분류" },
    { label: "상품문의" },
    { label: "이벤트 프로모션" },
    { label: "주문, 결제" },
  ];
  const dateList = () => [{ label: "전체" }, { label: "문의일시" }];

  const searchButton = () => {
    setReviewSearch(true);
  };
  const resetButton = () => {
    setReviewSearch(false);
  };
  return (
    <Container>
      <SearchBox>
        <ColumnBox>
          <TitleDiv>
            <p style={{ margin: 0 }}>카테고리</p>
          </TitleDiv>
          <CategoryDiv>
            <Autocomplete
              disablePortal
              size="small"
              options={inquiryBigList()}
              sx={{ width: 400, paddingLeft: "2rem" }}
              renderInput={(params) => <TextField {...params} />}
              defaultValue="대분류"
            />
            <Autocomplete
              disablePortal
              size="small"
              options={inquirySmallList()}
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
            <TextField size="small" sx={{ width: 400, paddingLeft: "2rem" }} />
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
                dateFormat="yyyy/MM/dd"
              />
              <MyDatePicker
                selected={endDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={endDate}
                dateFormat="yyyy/MM/dd"
              />
            </CalendarDiv>
          </DateDiv>
        </ColumnBox>
        <ColumnBox>
          <TitleDiv>
            <p style={{ margin: 0 }}>리뷰 내용</p>
          </TitleDiv>
          <CategoryDiv>
            <TextField size="small" sx={{ width: 400, paddingLeft: "2rem" }} />
          </CategoryDiv>
        </ColumnBox>
        <ColumnBox>
          <TitleDiv>
            <p style={{ margin: 0 }}>답변유무</p>
          </TitleDiv>
          <CategoryDiv>
            <Checkbox
              defaultChecked
              name="check"
              sx={{ paddingLeft: "2rem" }}
            />
            <p style={{ paddingRight: "2rem" }}>전체</p>
            <Checkbox name="check" />
            <p style={{ paddingRight: "2rem" }}>미답변</p>
            <Checkbox name="check" />
            <p style={{ paddingRight: "2rem" }}>답변완료</p>
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
