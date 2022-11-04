import React, { useState } from "react";
import styled from "styled-components";

// 달력
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// mui
import Grid2 from "@mui/material/Unstable_Grid2";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function CouponPeriod() {
  // 기준기간
  const [standard, setStandard] = useState("");

  const standardChange = (e) => {
    setStandard(e.target.value);
  };

  // 시작 날짜
  const [startDate, setStartDate] = useState(new Date());
  // 마감 날짜
  const [endDate, setEndDate] = useState(new Date());

  return (
    <Grid2 sx={{ padding: "0", display: "flex" }}>
      <Grid2
        xs={2}
        sx={{
          padding: "0",
          background: "#DADADA",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
          fontWeight: "600",
        }}
      >
        기간
      </Grid2>
      <Grid2
        xs={10}
        sx={{
          padding: "0",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          display: "flex",
          alignContent: "center",
          background: "white",
        }}
      >
        <FormControl
          sx={{
            marginLeft: "5rem",
            marginRight: "3rem",
            minWidth: 200,
            width: 300,
          }}
        >
          <InputLabel id="demo-simple-select-autowidth-label">
            기준기간
          </InputLabel>
          <Select
            value={standard}
            onChange={standardChange}
            label="기준"
            MenuProps={{
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left",
              },
              getContentAnchorEl: null,
            }}
            sx={{ border: 1, height: 50, borderRadius: 0 }}
          >
            <MenuItem value={"쿠폰사용일시"}>쿠폰사용일시</MenuItem>
            <MenuItem value={"쿠폰마감일시"}>쿠폰마감일시</MenuItem>
          </Select>
        </FormControl>
        <ButtonGroup>
          <Button>1일</Button>
          <Button>1주일</Button>
          <Button>1개월</Button>
          <Button>1년</Button>
        </ButtonGroup>
        <div
          style={{
            width: "25rem",
            display: "flex",
            alignItems: "center",
            marginLeft: "3rem",
          }}
        >
          <MyDatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            // endDate={endDate}
            dateFormat="yyyy/MM/dd"
          />
          <WaveTag>~</WaveTag>
          <MyDatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            dateFormat="yyyy/MM/dd"
          />
        </div>
      </Grid2>
    </Grid2>
  );
}

const ButtonGroup = styled.div`
  display: flex;
  margin-left: 1rem;
  height: 100%;
  align-items: center;
  justify-content: center;
  /* box-shadow: 0; */
`;

const Button = styled.button`
  background: #0b7ee9;
  font-size: 1rem;
  padding: 0.5rem;
  color: white;
  border-color: #0b7ee9;
  width: 4rem;
  height: 70%;
  &:hover {
    cursor: pointer;
  }
`;

const WaveTag = styled.div`
  font-size: 2rem;
`;

export const MyDatePicker = styled(DatePicker)`
  /* width: 15rem; */
  /* background-color: transparent; */
  height: 3rem;
  font-size: 1rem;
  font-weight: bold;
  color: black;
  border: 1px solid;
  width: 10rem;
  margin-right: 0;
  margin-left: 1rem;
  padding-left: 1rem;

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
