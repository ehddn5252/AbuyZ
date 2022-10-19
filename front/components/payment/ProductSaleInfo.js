import React from "react";
import styled from "styled-components";

export default function ProductSaleInfo() {
  return (
    <div>
      <h1>할인 및 쿠폰 정보</h1>
      <hr></hr>
      <AllDiv>
        <LeftDiv>
          <span>총 상품 금액</span>
        </LeftDiv>
        <RightDiv>
          <span>1800원</span>
        </RightDiv>
      </AllDiv>
      <AllDiv>
        <LeftDiv>
          <span>상품 할인 금액</span>
        </LeftDiv>
        <RightDiv>
          <span>-900원</span>
        </RightDiv>
      </AllDiv>
      <AllDiv>
        <LeftDiv>
          <span>쿠폰 사용</span>
        </LeftDiv>
        <RightDiv>
          <span>-90원</span>
        </RightDiv>
      </AllDiv>
      <AllDiv>
        <LeftDiv>
          <span>배송비</span>
        </LeftDiv>
        <RightDiv>
          <span>3000원</span>
        </RightDiv>
      </AllDiv>
      <hr></hr>
      <AllDiv>
        <LastLeftDiv>
          <span>최종 결제 금액</span>
        </LastLeftDiv>
        <RightDiv>
          <span>3810원</span>
        </RightDiv>
      </AllDiv>
    </div>
  );
}

const AllDiv = styled.div`
  display: flex;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const LeftDiv = styled.div`
  flex: 5;
  font-size: 1rem;
  margin-left: 2rem;
`;

const RightDiv = styled.div`
  flex: 5;
  font-size: 1.3rem;
  text-align: right;
  margin-right: 2rem;
`;

const LastLeftDiv = styled.div`
  flex: 5;
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 2rem;
`;
