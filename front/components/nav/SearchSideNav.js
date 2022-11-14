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

// Next.js
import { useRouter } from "next/router";
export default function SearchSideNav({
  setFeeOption,
  setPriceOption,
  setCategoryOption,
  setStartPrice,
  setEndPrice,
}) {
  const router = useRouter();

  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [priceOpen, setPriceOpen] = useState(false);
  // reset 초기화
  const resetButton = () => {
    setFeeOption(null);
    setPriceOption(null);
    setCategoryOption(null);
    setStartPrice(null);
    setEndPrice(null);
    router.reload();
  };

  // 시작 끝값 변경 적용
  const startendButton = () => {
    setStartPrice(start);
    setEndPrice(end);
  };
  return (
    <NavContainer>
      <Title>
        <p style={{ margin: 0, fontSize: "1.3rem", fontWeight: "1000" }}>
          필터
        </p>
        <div
          onClick={resetButton}
          style={{ display: "flex", alignItems: "flex-end", cursor: "pointer" }}
        >
          <RestartAltIcon style={{ fontSize: "medium" }} />
          <p style={{ margin: 0, marginLeft: "0.3rem" }}>초기화</p>
        </div>
      </Title>

      <FormControl>
        <FormLabel
          id="label"
          sx={{ fontSize: "1.3rem", fontWeight: "1000", marginTop: "0.6rem" }}
        >
          배송
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          onChange={(e) => {
            setFeeOption(e.target.value);
          }}
          sx={{
            marginTop: "0.5rem",
            paddingBottom: "0.5rem",
            borderBottom: "1px solid rgb(170, 170, 170, 0.5)",
          }}
        >
          <FormControlLabel value="0" control={<Radio />} label="무료" />
          <FormControlLabel
            value="1"
            control={<Radio />}
            label="3,000원 미만"
          />
          <FormControlLabel
            value="2"
            control={<Radio />}
            label="3,000원 이상"
          />
        </RadioGroup>
      </FormControl>
      <FormControl sx={{ marginTop: "1rem" }}>
        <FormLabel id="label" sx={{ fontSize: "1.3rem", fontWeight: "1000" }}>
          가격
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          onChange={(e) => {
            setPriceOption(e.target.value);
          }}
          sx={{
            marginTop: "0.5rem",
            paddingBottom: "0.5rem",
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
      <PriceButton onClick={() => setPriceOpen(!priceOpen)}>
        직접 가격 설정하기
      </PriceButton>

      {priceOpen ? (
        <div>
          <InputBox>
            <Input
              name="start"
              id="start"
              onClick={(e) => {
                setStart(e.target.value);
              }}
            ></Input>
            <p style={{ margin: 0 }}>~</p>
            <Input
              name="end"
              id="end"
              onClick={(e) => {
                setEnd(e.target.value);
              }}
            ></Input>
          </InputBox>
          <Button onClick={startendButton}>필터 적용하기</Button>
        </div>
      ) : null}
    </NavContainer>
  );
}

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  width: 100%;
  min-height: 35rem;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 3px solid rgb(170, 170, 170, 0.5);
  padding-bottom: 1rem;
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
  border-radius: 5px;
  color: white;
  background-color: #56a9f1;
  cursor: pointer;
`;

const PriceButton = styled.button`
  width: 100%;
  height: 2rem;
  border: 1px solid #56a9f1;
  border-radius: 5px;
  color: #56a9f1;
  background-color: white;
  cursor: pointer;
`;
