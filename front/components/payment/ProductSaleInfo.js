import React, { useState } from "react";
import styled from "styled-components";
import MyCouponSelectModal from "./MyCouponSelectModal";

export default function ProductSaleInfo() {
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };
  return (
    <div>
      <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
        할인 및 쿠폰 정보
      </span>
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
          <div>
            <SelectButton onClick={showModal}>쿠폰 사용하기</SelectButton>
          </div>
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
      {modalOpen && (
        <MyCouponSelectModal setModalOpen={setModalOpen}></MyCouponSelectModal>
      )}
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

const SelectButton = styled.button`
  background-color: white;
  padding: 0.7rem 0.8rem 0.7rem 0.8rem;
  border: 1px solid #ff7171;
  border-radius: 10px;
`;
