import React from "react";
import styled from "styled-components";

export default function AddCoupon() {
  return (
    <AddCouponBox>
      <h1 style={{ paddingLeft: "2rem" }}>쿠폰 등록</h1>
      <hr style={{ background: "#ff9494", width: "95%" }}></hr>
      <ContentBox>
        <ContentTitle>쿠폰 이름 : </ContentTitle>
      </ContentBox>
      <ContentBox>
        <ContentTitle>쿠폰 시작 일자 : </ContentTitle>
      </ContentBox>
      <ContentBox>
        <ContentTitle>쿠폰 마감 일자 : </ContentTitle>
      </ContentBox>
      <ContentBox>
        <ContentTitle>쿠폰 대상 카테고리 : </ContentTitle>
      </ContentBox>
      <ContentBox>
        <ContentTitle>쿠폰 할인금액 : </ContentTitle>
      </ContentBox>
    </AddCouponBox>
  );
}

const AddCouponBox = styled.div`
  border: 0.3rem solid #ff9494;
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
`;

const ContentBox = styled.div`
  font-weight: 600;
  font-size: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-left: 4rem;
  display: flex;
`;

const ContentTitle = styled.div`
  width: 8rem;
`;
