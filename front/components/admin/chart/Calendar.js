// React
import React, { useState } from "react";

// Chart
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// StyledComponent
import styled from "styled-components";

export default function Calendar({
  setStartDate,
  setEndDate,
  startDate,
  endDate,
}) {
  return (
    <Container>
      <StartDateDiv>
        <StartDateTitle>시작일</StartDateTitle>
        <MyDatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          dateFormat="yyyy/MM/dd"
        />
      </StartDateDiv>
      <WaveTag>~</WaveTag>
      <EndDateDiv>
        <EndDateTitle>종료일</EndDateTitle>
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
      </EndDateDiv>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
  padding: 1rem;
`;

const StartDateDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40%;
`;

const StartDateTitle = styled.p`
  margin: 0;
  padding: 0;
  width: 45%;
  text-align: center;
`;

const EndDateDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40%;
`;

const EndDateTitle = styled.p`
  margin: 0;
  padding: 0;
  width: 45%;
  text-align: center;
`;

const WaveTag = styled.div`
  font-size: 2rem;
  rotate: 90deg;
`;
const MyDatePicker = styled(DatePicker)`
  /* width: 15rem; */
  /* background-color: transparent; */
  height: 2rem;
  font-size: 1rem;
  font-weight: bold;
  color: black;
  border: 1px solid;
  width: 50%;

  .custom-react-datepicker__wrapper {
    display: flex;
    font-display: row;
    justify-content: space-between;
    align-items: center;
    width: 272px;
  }
  .custom-react-datepicker__label-span {
    font-size: 15px;
    width: 100%;
    color: #2b2b2b;
  }
  .react-datepicker__input-container input {
    width: 82px;
    height: 19px;
    padding: 5px 10px;
    background: #f5f5f5;
    border: 1px solid white;
    border-radius: 5px;
    font-size: 15px;
    font-weight: 400;
    text-align: center;
    color: #2b2b2b;
  }
  .react-datepicker-ignore-onclickoutside {
    border: 1px solid #6400ff !important;
    outline: none;
  }
  .react-datepicker__triangle {
    display: none;
  }
  .react-datepicker {
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
    border: none !important;
    border-radius: 4px;
  }
  .react-datepicker-wrapper {
    width: 102px;
  }
  .react-datepicker__header {
    height: 36px !important;
    padding: 0 !important;
    background-color: #6400ff !important;
    border: none !important;
    position: relative;
    text-align: center;
  }
  .custom-react-datepicker__select-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 198px;
    height: 36px;
  }
  .custom-react-datepicker__select-wrapper button {
    background-color: transparent;
    border: none;
  }
  .custom-react-datepicker__select-item {
    display: flex;
    font-display: row;
    justify-content: space-between;
    align-items: center;
    width: 64px;
  }
  .custom-react-datepicker__select-wrapper select {
    width: 54px;
    height: 18px;
    background: #ffffff;
    border-radius: 3px;
    font-weight: 400;
    font-size: 12px;
  }
  .custom-react-datepicker__select-wrapper span {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 18px;
    margin-left: 3px;
    font-weight: 500;
    font-size: 8px;
    color: white;
  }
  .react-datepicker__month {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 97px;
    margin-top: 25px !important;
  }
  .react-datepicker__week {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 14px;
    margin: 0.5px 0;
  }
  .react-datepicker__day-name,
  .react-datepicker__day {
    width: 20px !important;
    font-size: 8px;
    line-height: 14px !important;
    color: #7a7a7a !important;
  }
  .react-datepicker__day--selected {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 19px;
    height: 14px;
    background-color: white !important;
    border-radius: 7px !important;
    line-height: 14px;
  }
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range {
    background-color: #6400ff !important;
    border-radius: 7px !important;
    color: white !important;
  }
  .react-datepicker__day--keyboard-selected {
    background-color: white !important;
    color: #2b2b2b !important;
  }
  .react-datepicker__day--today {
    background-color: white;
    color: #2b2b2b;
  }
  .react-datepicker__day--range-start {
    background-color: #6400ff !important;
    border-radius: 7px !important;
    color: white !important;
  }
  .custom-react-datepicker__split-span {
    display: flex;
    font-display: row;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    width: 11px;
    margin: 0 10px;
    color: #2b2b2b;
  }
`;
