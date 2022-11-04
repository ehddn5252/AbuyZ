// React
import React, { useState } from "react";

// MUI
import Container from "@mui/material/Container";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
// StyledComponents
import styled from "styled-components";

export default function SearchSideNav({
  setFeeOption,
  setPriceOption,
  setCategoryOption,
  setStartPrice,
  setEndPrice,
}) {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);

  // reset 초기화
  const resetButton = () => {
    setFeeOption(null);
    setPriceOption(null);
    setCategoryOption(null);
    setStartPrice(null);
    setEndPrice(null);
  };

  // 시작 끝값 변경 적용
  const startendButton = () => {
    setStartPrice(start);
    setEndPrice(end);
  };
  return (
    <NavContainer>
      <Title>
        <p style={{ margin: 0, fontSize: "1.6rem", fontWeight: "1000" }}>
          필터
        </p>
        <div
          onClick={resetButton}
          style={{ display: "flex", alignItems: "flex-end", cursor: "pointer" }}
        >
          <RestartAltIcon />
          <p style={{ margin: 0 }}>초기화</p>
        </div>
      </Title>

      <hr />
      <FormControl>
        <FormLabel id="label" sx={{ fontSize: "1.6rem", fontWeight: "1000" }}>
          배송
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          onChange={(e) => {
            setFeeOption(e.target.value);
          }}
        >
          <FormControlLabel value="0" control={<Radio />} label="무료" />
          <FormControlLabel value="1" control={<Radio />} label="3000원 미만" />
          <FormControlLabel value="2" control={<Radio />} label="3000원 이상" />
        </RadioGroup>
      </FormControl>
      <FormControl sx={{ marginTop: "1rem" }}>
        <FormLabel id="label" sx={{ fontSize: "1.6rem", fontWeight: "1000" }}>
          가격
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          onChange={(e) => {
            setPriceOption(e.target.value);
          }}
        >
          <FormControlLabel value="0" control={<Radio />} label="3만원 이하" />
          <FormControlLabel
            value="1"
            control={<Radio />}
            label="3만원 ~ 10만원"
          />
          <FormControlLabel
            value="2"
            control={<Radio />}
            label="10만원 ~ 30만원"
          />
          <FormControlLabel value="3" control={<Radio />} label="30만원이상" />
        </RadioGroup>
      </FormControl>
      <InputBox>
        <Input
          name="start"
          onClick={(e) => {
            setStart(e.target.value);
          }}
        ></Input>
        <p style={{ margin: 0 }}>~</p>
        <Input
          name="end"
          onClick={(e) => {
            setEnd(e.target.value);
          }}
        ></Input>
      </InputBox>
      <Button onClick={startendButton}>필터 적용하기</Button>
    </NavContainer>
  );
}

const NavContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  padding: 0;
  width: 100%;
  height: 35rem;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px solid black;
  padding-bottom: 0.5rem;
`;
const InputBox = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1rem;
  align-items: center;
  justify-content: space-around;
`;

const Input = styled.input`
  width: 40%;
  height: 2rem;
`;

const Button = styled.button`
  width: 100%;
  height: 2rem;
  border: none;
  margin-top: 1rem;
  border-radius: 1rem;
  color: white;
  background-color: #56a9f1;
  cursor: pointer;
`;
