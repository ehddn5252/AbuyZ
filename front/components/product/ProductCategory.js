import React, { useState } from "react";
import styled from "styled-components";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
export default function ProductCategory() {
  const [s_price, setS_price] = useState(0);
  const [f_price, setF_price] = useState(0);
  const [s_p, setS_p] = useState(0);
  const [f_p, setF_p] = useState(0);
  const [morePriceOpen, setMorePriceOpen] = useState(false);

  // /* 배송 카테고리 */
  // const check1 = (checkthis) => {
  //   const checkboxes = document.getElementsByName("ck1");
  //   for (let i = 0; i < checkboxes.length; i++) {
  //     if (checkboxes[i] !== checkthis) {
  //       checkboxes[i].checked = false;
  //     }
  //   }
  // };
  /* 가격 카테고리 */
  // const check2 = (checkthis) => {
  //   const checkboxes = document.getElementsByName("ck2");
  //   if (checkthis.value === "1") {
  //     setS_price(0);
  //     setF_price(10000);
  //   } else if (checkthis.value === "2") {
  //     setS_price(10000);
  //     setF_price(30000);
  //   } else if (checkthis.value === "3") {
  //     setS_price(30000);
  //     setF_price(100000);
  //   } else {
  //     setS_price(100000);
  //     setF_price(200000);
  //   }
  //   for (let i = 0; i < checkboxes.length; i++) {
  //     if (checkboxes[i] !== checkthis) {
  //       checkboxes[i].checked = false;
  //     }
  //   }
  // };
  /* 대분류 카테고리 */
  // const check3 = (checkthis) => {
  //   const checkboxes = document.getElementsByName("ck3");
  //   for (let i = 0; i < checkboxes.length; i++) {
  //     if (checkboxes[i] !== checkthis) {
  //       checkboxes[i].checked = false;
  //     }
  //   }
  // };
  const priceSearch = () => {
    setS_price(s_p);
    setF_price(f_p);
  };
  return (
    <AllDiv>
      <FilterTitle>필터</FilterTitle>
      <FilterSource>
        <ShipDiv>
          <Title>배송</Title>
          <Container>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Gender
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
                <FormControlLabel
                  value="disabled"
                  disabled
                  control={<Radio />}
                  label="other"
                />
              </RadioGroup>
            </FormControl>
          </Container>
        </ShipDiv>
        <ShipDiv>
          <Title>가격</Title>
          <Container>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Gender
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
                <FormControlLabel
                  value="disabled"
                  disabled
                  control={<Radio />}
                  label="other"
                />
              </RadioGroup>
            </FormControl>
            <Button onClick={() => setMorePriceOpen(!morePriceOpen)}>+</Button>
          </Container>
        </ShipDiv>
        {morePriceOpen === true ? (
          <ShipDiv>
            <Title></Title>
            <Container>
              <input
                placeholder="시작 가격"
                style={{ marginRight: "1rem" }}
                onChange={(e) => setS_p(e.target.value)}
              ></input>
              ~
              <input
                placeholder="끝 가격"
                style={{ marginLeft: "1rem" }}
                onChange={(e) => setF_p(e.target.value)}
              ></input>
              <Button onClick={priceSearch}>검색</Button>
            </Container>
          </ShipDiv>
        ) : null}
        <ShipDiv>
          <Title>카테고리</Title>
          <Container>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Gender
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
                <FormControlLabel
                  value="disabled"
                  disabled
                  control={<Radio />}
                  label="other"
                />
              </RadioGroup>
            </FormControl>
          </Container>
        </ShipDiv>
      </FilterSource>
    </AllDiv>
  );
}

const AllDiv = styled.div`
  border: 1px black solid;
  border-radius: 10px;
  width: 55%;
  display: flex;
  flex-direction: row;
`;

const FilterTitle = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
  font-weight: bold;
`;

const FilterSource = styled.div`
  flex: 5;
`;
const ShipDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const Title = styled.div`
  flex: 1;
  font-size: 1.2rem;
  font-weight: bold;
`;
const Container = styled.div`
  flex: 7;
  display: flex;
  flex-direction: row;
`;

const Button = styled.button`
  margin-left: 3rem;
  border-color: #f8f9fa;
  background-color: aliceblue;
`;
