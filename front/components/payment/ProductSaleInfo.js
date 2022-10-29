import React, { useState } from "react";
import styled from "styled-components";
import MyCouponSelectModal from "./MyCouponSelectModal";

export default function ProductSaleInfo() {
  const deliveryFee = 3000;
  const productList = [
    {
      price: 5000,
      discount: 25,
      count: 4,
      category: "식품",
    },
    {
      price: 10000,
      discount: 10,
      count: 2,
      category: "의류",
    },
  ];
  const [modalOpen, setModalOpen] = useState(false);
  let categoryList = [];
  for (var i = 0; i < productList.length; i++) {
    categoryList.push(productList[i].category);
  }
  let priceadd = 0;
  for (var i = 0; i < productList.length; i++) {
    priceadd += productList[i].price * productList[i].count;
  }

  let discountprice = 0;
  for (var j = 0; j < productList.length; j++) {
    discountprice +=
      productList[j].price *
      (productList[j].discount / 100) *
      productList[j].count;
  }
  const showModal = () => {
    setModalOpen(true);
  };

  const [couponDiscount, setCouponDiscount] = useState(-1);
  return (
    <div>
      <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
        할인 및 쿠폰 정보
      </span>
      <hr></hr>
      <AllDiv>
        <LeftDiv>
          <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
            주문 금액
          </span>
        </LeftDiv>
        <RightDiv>
          <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
            {(priceadd - discountprice).toLocaleString("ko-KR")}원
          </span>
        </RightDiv>
      </AllDiv>
      <div
        style={{
          backgroundColor: "rgb(127,127,127,0.1)",
          borderRadius: "5px",
          padding: "0.1rem",
          marginLeft: "2.5rem",
          marginRight: "2.5rem",
        }}
      >
        <AllDiv>
          <LeftDiv>
            <span
              style={{
                marginLeft: "1rem",
                color: "#aaaaaa",
                fontSize: "0.9rem",
              }}
            >
              상품금액
            </span>
          </LeftDiv>
          <RightDiv>
            <span
              style={{
                marginLeft: "1rem",
                color: "#aaaaaa",
                fontSize: "0.9rem",
              }}
            >
              {priceadd.toLocaleString("ko-KR")}원
            </span>
          </RightDiv>
        </AllDiv>
        <AllDiv>
          <LeftDiv>
            <span
              style={{
                marginLeft: "1rem",
                color: "#aaaaaa",
                fontSize: "0.9rem",
              }}
            >
              상품할인금액
            </span>
          </LeftDiv>
          <RightDiv>
            <span
              style={{
                marginLeft: "1rem",
                color: "#aaaaaa",
                fontSize: "0.9rem",
              }}
            >
              -{discountprice.toLocaleString("ko-KR")}원
            </span>
          </RightDiv>
        </AllDiv>
      </div>
      <AllDiv>
        <LeftDiv>
          <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
            쿠폰할인
          </span>
        </LeftDiv>
        <RightDiv>
          {couponDiscount > 0 ? (
            <div>
              <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                -{couponDiscount}원{" "}
              </span>
              <SelectButton onClick={showModal}>쿠폰변경</SelectButton>
            </div>
          ) : (
            <SelectButton onClick={showModal}>쿠폰사용</SelectButton>
          )}
        </RightDiv>
      </AllDiv>
      <AllDiv>
        <LeftDiv>
          <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>배송비</span>
        </LeftDiv>
        <RightDiv>
          <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
            {deliveryFee.toLocaleString("ko-KR")}원
          </span>
        </RightDiv>
      </AllDiv>
      <hr></hr>
      <AllDiv>
        <LastLeftDiv>
          <span style={{ fontWeight: "bold", fontSize: "1.9rem" }}>
            최종 결제 금액
          </span>
        </LastLeftDiv>
        <RightDiv>
          {couponDiscount === -1 ? (
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
          )}
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
  width: 7rem;
  height: 2rem;
  color: #56a9f1;
  border: 1px solid #56a9f1;
  border-radius: 5px;
`;
