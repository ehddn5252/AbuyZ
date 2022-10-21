import React from "react";
import styled from "styled-components";

export default function CouponItem(props) {
  return (
    <CouponBox>
      <Title>{props.snack.title}</Title>
      <Content>쿠폰 시작 일시 : {props.snack.startDate}</Content>
      <Content>쿠폰 끝 일시 : {props.snack.endDate}</Content>
      <Content>사용 카테고리 : {props.snack.category}</Content>
      <Content>쿠폰 할인 금액 : {props.snack.discount}원</Content>
      <ButtonBox>
        <DeleteButton>삭제</DeleteButton>
        <EditButton>수정</EditButton>
      </ButtonBox>
    </CouponBox>
  );
}

const CouponBox = styled.div`
  border: 0.3rem solid #ff9494;
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
`;

const Title = styled.div`
  font-weight: 800;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  margin-left: 0;
`;

const Content = styled.div`
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const DeleteButton = styled.button`
  background-color: #ffffff;
  color: gray;
  border: 1px solid;
  border-radius: 0.8rem;
  height: 2rem;
  width: 3rem;
  font-size: 1rem;
`;

const EditButton = styled.button`
  background-color: #ff7171;
  color: white;
  border: 1px solid;
  border-radius: 0.8rem;
  margin-left: 1rem;
  height: 2rem;
  width: 5rem;
  font-size: 1rem;
`;
