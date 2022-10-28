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

export default function SearchSideNav() {
  return (
    <NavContainer>
      <Title>
        <p>필터</p>
        <div style={{ display: "flex" }}>
          <RestartAltIcon />
          <p>초기화</p>
        </div>
      </Title>

      <hr />
      <FormControl>
        <FormLabel id="label">배송</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="free"
          name="radio-buttons-group"
        >
          <FormControlLabel value="free" control={<Radio />} label="무료" />
          <FormControlLabel
            value="donw"
            control={<Radio />}
            label="3000원 미만"
          />
          <FormControlLabel
            value="up"
            control={<Radio />}
            label="3000원 이상"
          />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel id="label">가격</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="free"
          name="radio-buttons-group"
        >
          <FormControlLabel value="1" control={<Radio />} label="1만원 이하" />
          <FormControlLabel
            value="2"
            control={<Radio />}
            label="1만원 ~ 3만원"
          />
          <FormControlLabel
            value="3"
            control={<Radio />}
            label="3만원 ~ 10만원"
          />
          <FormControlLabel value="4" control={<Radio />} label="10만원이상" />
        </RadioGroup>
      </FormControl>
      <InputBox>
        <Input></Input>
        <p style={{ margin: 0 }}>~</p>
        <Input></Input>
      </InputBox>
      <Button>필터 적용하기</Button>
    </NavContainer>
  );
}

const NavContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0;
  width: 100%;
  height: 35rem;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
`;
const InputBox = styled.div`
  display: flex;
  width: 100%;
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
  border-radius: 1rem;
  color: white;
  background-color: #56a9f1;
`;
