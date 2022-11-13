import React, { useState } from "react";
import styled from "styled-components";
import MyCouponSelectModal from "./MyCouponSelectModal";

export default function ProductSaleInfo({ paymentList }) {
  const [modalOpen, setModalOpen] = useState(false);
  let categoryList = [];
  for (var i = 0; i < paymentList.length; i++) {
    categoryList.push(paymentList[i].productDto.bigCategoryUid);
  }

  let priceadd = 0;
  for (var i = 0; i < paymentList.length; i++) {
    priceadd += paymentList[i].productDto.price * paymentList[i].productCount;
  }

  let discountprice = 0;
  for (var j = 0; j < paymentList.length; j++) {
    discountprice +=
      paymentList[j].productDto.price *
      (paymentList[j].productDto.discountRate / 100) *
      paymentList[j].productCount;
  }
  const showModal = () => {
    setModalOpen(true);
  };

  const [couponDiscount, setCouponDiscount] = useState(-1);
  return (
    <div>
      <Title>할인 및 쿠폰 정보</Title>
      <hr></hr>
      <AllDiv>
        <LeftDiv>
          <ElementTitle>주문 금액</ElementTitle>
        </LeftDiv>
        <RightDiv>
          <ElementTitle>
            {(priceadd - discountprice).toLocaleString("ko-KR")}원
          </ElementTitle>
        </RightDiv>
      </AllDiv>
      {discountprice > 0 ? (
        <DiscountContainer>
          <AllDiv>
            <LeftDiv>
              <DiscountElement>상품금액</DiscountElement>
            </LeftDiv>
            <RightDiv>
              <DiscountElement>
                {priceadd.toLocaleString("ko-KR")}원
              </DiscountElement>
            </RightDiv>
          </AllDiv>
          <AllDiv>
            <LeftDiv>
              <DiscountElement>상품할인금액</DiscountElement>
            </LeftDiv>
            <RightDiv>
              <DiscountElement>
                -{discountprice.toLocaleString("ko-KR")}원
              </DiscountElement>
            </RightDiv>
          </AllDiv>
        </DiscountContainer>
      ) : null}

      <AllDiv>
        <LeftDiv>
          <ElementTitle>쿠폰할인</ElementTitle>
        </LeftDiv>
        <RightDiv>
          {couponDiscount > 0 ? (
            <div>
              <ElementTitle>-{couponDiscount.toLocaleString("ko-KR")}원 </ElementTitle>
              <SelectButton onClick={showModal}>쿠폰변경</SelectButton>
              <SelectButton onClick={showModal}>쿠폰삭제</SelectButton>
            </div>
          ) : (
            <SelectButton onClick={showModal}>쿠폰사용</SelectButton>
          )}
        </RightDiv>
      </AllDiv>
      <AllDiv>
        <LeftDiv>
          <ElementTitle>배송비</ElementTitle>
        </LeftDiv>
        <RightDiv>
          <ElementTitle>
            {/* {deliveryFee.toLocaleString("ko-KR")}원 */}
          </ElementTitle>
        </RightDiv>
      </AllDiv>
      <hr></hr>
      <AllDiv>
        <LastLeftDiv>
          <Title>최종 결제 금액</Title>
        </LastLeftDiv>
        <RightDiv>
          {/* {couponDiscount === -1 ? (
            <span style={{ fontWeight: "bold", fontSize: "1.9rem" }}>
              {(priceadd - discountprice + deliveryFee).toLocaleString("ko-KR")}
              원
            </span>
          ) : (
            <span style={{ fontWeight: "bold", fontSize: "1.9rem" }}>
              {(
                priceadd -
                discountprice +
                deliveryFee -
                couponDiscount
              ).toLocaleString("ko-KR")}
              원
            </span>
          )} */}
        </RightDiv>
      </AllDiv>
      {modalOpen && (
        <MyCouponSelectModal
          setModalOpen={setModalOpen}
          setCouponDiscount={setCouponDiscount}
          categoryList={categoryList}
        ></MyCouponSelectModal>
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
  vertical-align: middle;
`;

const RightDiv = styled.div`
  flex: 5;
  font-size: 1.3rem;
  text-align: right;
  margin-right: 2rem;
  vertical-align: middle;
`;

const LastLeftDiv = styled.div`
  flex: 5;
  font-size: 1rem;
  margin-left: 2rem;
`;

const SelectButton = styled.button`
  background-color: white;
  width: 5rem;
  height: 2rem;
  color: #56a9f1;
  border: 1px solid #56a9f1;
  border-radius: 5px;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 1.5rem;
`;

const ElementTitle = styled.span`
  font-weight: bold;
  font-size: 1.2rem;
`;

const DiscountContainer = styled.div`
  background-color: rgb(127, 127, 127, 0.1);
  border-radius: 5px;
  padding: 0.1rem;
  margin-left: 2.5rem;
  margin-right: 2.5rem;
`;

const DiscountElement = styled.span`
  margin-left: 1rem;
  color: #aaaaaa;
  font-size: 0.9rem;
`;
