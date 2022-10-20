import React, { useState } from "react";
import styled from "styled-components";
export default function ProductCategory() {
  const [morePriceOpen, setMorePriceOpen] = useState(false);
  /* 배송 카테고리 */
  const check1 = (checkthis) => {
    const checkboxes = document.getElementsByName("ck1");
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== checkthis) {
        checkboxes[i].checked = false;
      }
    }
  };
  /* 가격 카테고리 */
  const check2 = (checkthis) => {
    const checkboxes = document.getElementsByName("ck2");
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== checkthis) {
        checkboxes[i].checked = false;
      }
    }
  };
  /* 대분류 카테고리 */
  const check3 = (checkthis) => {
    const checkboxes = document.getElementsByName("ck3");
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== checkthis) {
        checkboxes[i].checked = false;
      }
    }
  };
  return (
    <AllDiv>
      <FilterTitle>필터</FilterTitle>
      <FilterSource>
        <ShipDiv>
          <Title>배송</Title>
          <Container>
            <input
              type="checkbox"
              name="ck1"
              value="1"
              onChange={(e) => check1(e.target)}
            />
            무료배송
            <input
              type="checkbox"
              name="ck1"
              value="2"
              onChange={(e) => check1(e.target)}
              style={{ marginLeft: "3rem" }}
            />
            3000원 미만
            <input
              type="checkbox"
              name="ck1"
              value="3"
              onChange={(e) => check1(e.target)}
              style={{ marginLeft: "3rem" }}
            />
            3000원 이상
          </Container>
        </ShipDiv>
        <ShipDiv>
          <Title>가격</Title>
          <Container>
            <input
              type="checkbox"
              name="ck2"
              value="1"
              onChange={(e) => check2(e.target)}
            />
            5만원 이하
            <input
              type="checkbox"
              name="ck2"
              value="2"
              onChange={(e) => check2(e.target)}
              style={{ marginLeft: "3rem" }}
            />
            5만원 ~ 10만원
            <input
              type="checkbox"
              name="ck2"
              value="3"
              onChange={(e) => check2(e.target)}
              style={{ marginLeft: "3rem" }}
            />
            10만원 ~ 30만원
            <input
              type="checkbox"
              name="ck2"
              value="4"
              onChange={(e) => check2(e.target)}
              style={{ marginLeft: "3rem" }}
            />
            30만원 이상
            <button
              style={{ marginLeft: "3rem" }}
              onClick={() => setMorePriceOpen(!morePriceOpen)}
            >
              플러스
            </button>
          </Container>
        </ShipDiv>
        {morePriceOpen === true ? (
          <ShipDiv>
            <Title></Title>
            <Container>
              <input
                placeholder="시작 가격"
                style={{ marginRight: "1rem" }}
              ></input>
              ~
              <input
                placeholder="끝 가격"
                style={{ marginLeft: "1rem" }}
              ></input>
              <button style={{ marginLeft: "1rem" }}>검색</button>
            </Container>
          </ShipDiv>
        ) : null}
        <ShipDiv>
          <Title>카테고리</Title>
          <Container>
            <input
              type="checkbox"
              name="ck3"
              value="1"
              onChange={(e) => check3(e.target)}
            />
            식품
            <input
              type="checkbox"
              name="ck3"
              value="2"
              onChange={(e) => check3(e.target)}
              style={{ marginLeft: "3rem" }}
            />
            생활/건강
            <input
              type="checkbox"
              name="ck3"
              value="3"
              onChange={(e) => check3(e.target)}
              style={{ marginLeft: "3rem" }}
            />
            가구/인테리어
            <input
              type="checkbox"
              name="ck3"
              value="4"
              onChange={(e) => check3(e.target)}
              style={{ marginLeft: "3rem" }}
            />
            반려/도서/취미
            <input
              type="checkbox"
              name="ck3"
              value="5"
              onChange={(e) => check3(e.target)}
              style={{ marginLeft: "3rem" }}
            />
            뷰티
          </Container>
        </ShipDiv>
      </FilterSource>
    </AllDiv>
  );
}

const AllDiv = styled.div`
  border: 1px black solid;
  border-radius: 10px;
  width: 70%;
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
