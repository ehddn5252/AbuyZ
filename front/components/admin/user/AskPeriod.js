import React, { useEffect, useState } from "react";
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

export default function AskPeriod(props) {
  // 기준기간
  const [standard, setStandard] = useState("");

  // 기준 기간 설정
  const standardChange = (e) => {
    props.setStand(e.target.value);
    setStandard(e.target.value);
  };

  // 시작 날짜
  const [startDate, setStartDate] = useState(new Date());
  // 마감 날짜
  const [endDate, setEndDate] = useState(new Date());

  // 리셋 감지기
  // 부모 컴포넌트에서 숫자가 올라간 것을 감지해 리셋시킴
  useEffect(() => {
    setStandard("");
    setStartDate(new Date());
    setEndDate(new Date());
  }, [props.reset]);

  // 1일 버튼
  const oneDay = () => {
    const today = new Date();
    const day = new Date(today);

    day.setDate(today.getDate() + 1);
    setStartDate(new Date());
    setEndDate(day);
    props.setStartDate(new Date());
    props.setEndDate(day);
  };

  // 1주 버튼
  const oneWeek = () => {
    const today = new Date();
    const week = new Date(today);

    week.setDate(today.getDate() + 7);
    setStartDate(new Date());
    setEndDate(week);
    props.setStartDate(new Date());
    props.setEndDate(week);
  };

  // 1달 버튼
  const oneMonth = () => {
    const today = new Date();
    const month = new Date(today);

    month.setDate(today.getDate() + 30);
    setStartDate(new Date());
    setEndDate(month);
    props.setStartDate(new Date());
    props.setEndDate(month);
  };

  // 1년 버튼
  const oneYear = () => {
    const today = new Date();
    const year = new Date(today);

    year.setDate(today.getDate() + 365);
    setStartDate(new Date());
    setEndDate(year);
    props.setStartDate(new Date());
    props.setEndDate(year);
  };

  return (
    <Grid2
      xs={12}
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
          }}
          sx={{ border: 1, height: 50, borderRadius: 0 }}
        >
          <MenuItem value={1}>전체</MenuItem>
          <MenuItem value={2}>등록일시</MenuItem>
          <MenuItem value={2}>처리일시</MenuItem>
        </Select>
      </FormControl>
      <ButtonGroup>
        <Button onClick={oneDay}>1일</Button>
        <Button onClick={oneWeek}>1주일</Button>
        <Button onClick={oneMonth}>1개월</Button>
        <Button onClick={oneYear}>1년</Button>
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
          onChange={(date) => {
            props.setStartDate(date), setStartDate(date);
          }}
          selectsStart
          startDate={startDate}
          dateFormat="yyyy/MM/dd"
        />
        <WaveTag>~</WaveTag>
        <MyDatePicker
          selected={endDate}
          onChange={(date) => {
            props.setEndDate(date), setEndDate(date);
          }}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="yyyy/MM/dd"
        />
      </div>
    </Grid2>
  );
}

const ButtonGroup = styled.div`
  display: flex;
  margin-left: 1rem;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  background: #dadada;
  font-size: 1rem;
  padding: 0.5rem;
  color: black;
  border-color: #eeeeee;
  width: 4rem;
  height: 70%;
  box-shadow: 0;
  &:hover {
    cursor: pointer;
  }
`;

const WaveTag = styled.div`
  font-size: 2rem;
`;

export const MyDatePicker = styled(DatePicker)`
  height: 3rem;
  font-size: 1rem;
  font-weight: bold;
  color: black;
  border: 1px solid;
  width: 10rem;
  margin-right: 0;
  margin-left: 1rem;
  padding-left: 1rem;
`;
