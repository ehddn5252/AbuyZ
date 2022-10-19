import React, { useState } from "react";
import styled from "styled-components";
import { SearchContainer } from "./SearchWord";
import { SearchTitle } from "./InquireProduct";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

export default function Period() {
  // 기준기간
  const [standard, setStandard] = useState("");

  const [value, setValue] = React.useState([null, null]);

  // 기준기간 셀렉트 했을 때
  const standardChange = (event) => {
    setStandard(event.target.value);
  };

  return (
    <SearchContainer style={{ marginBottom: "2rem" }}>
      <SearchTitle style={{ paddingLeft: "4rem", marginTop: "1rem" }}>
        기간
      </SearchTitle>
      <FormControl
        sx={{
          marginTop: "2rem",
          marginLeft: "3rem",
          minWidth: 100,
          width: 200,
        }}
      >
        <InputLabel id="demo-simple-select-autowidth-label">
          기준기간
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={standard}
          onChange={standardChange}
          autoWidth
          label="기준"
        >
          <MenuItem value={"상품등록일"}>상품등록일</MenuItem>
          <MenuItem value={"상품판매일"}>상품판매일</MenuItem>
        </Select>
      </FormControl>
      <ButtonGroup
        sx={{
          marginTop: "2rem",
          marginLeft: "1rem",
          // minWidth: 100,
          // width: "2rem",
        }}
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button sx={{ width: "5rem" }}>하루</Button>
        <Button sx={{ width: "5rem" }}>1주일</Button>
        <Button sx={{ width: "5rem" }}>1개월</Button>
        <Button sx={{ width: "5rem" }}>1년</Button>
      </ButtonGroup>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        localeText={{ start: "Check-in", end: "Check-out" }}
      >
        <DateRangePicker
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps} />
            </React.Fragment>
          )}
        />
      </LocalizationProvider>
    </SearchContainer>
  );
}
