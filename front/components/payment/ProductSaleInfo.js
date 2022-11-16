import React, { useEffect, useState } from "react";

// Style
import styled from "styled-components";

// 하위 Component
import MyCouponSelectModal from "./MyCouponSelectModal";

// State
import { baksetPayments, couponitems } from "../../states/index";
import { useRecoilState } from "recoil";

export default function ProductSaleInfo({ paymentList }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [basketValue, setBasketValue] = useRecoilState(baksetPayments);
  const [couponUidList, setCouponUidList] = useRecoilState(couponitems);
  const [uniqueCate, setUniqueCate] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(-1);
  const [usedCoupon, setUsedCoupon] = useState(null);
  // 금액
  const [priceadd, setPriceadd] = useState(0);
  const [discountprice, setcountprice] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  useEffect(() => {
    let categoryList = [];
    for (var i = 0; i < paymentList.length; i++) {
      categoryList.push(paymentList[i].productDto.bigCategoryUid);
    }
    const set = new Set(categoryList);
    const uniqueCate1 = [...set];
    setUniqueCate(uniqueCate1);
    // 총 금액
    let temp1 = 0;
    for (var i = 0; i < paymentList.length; i++) {
      temp1 += paymentList[i].productDto.price * paymentList[i].productCount;
    }
    // 할인 가격
    let temp2 = 0;
    for (var j = 0; j < paymentList.length; j++) {
      temp2 +=
        paymentList[j].productDto.price *
        (paymentList[j].productDto.discountRate / 100) *
        paymentList[j].productCount;
    }
    // 배달요금
    let temp3 = 0;
    let brandlist = [];
    for (var k = 0; k < paymentList.length; k++) {
      if (!brandlist.includes(paymentList[k].productDto.brandName)) {
        brandlist.push(paymentList[k].productDto.brandName);
        temp3 += paymentList[k].productDto.deliveryFee;
      }
    }

    // 쿠폰 리스트 선정
    let tempCoupon = [];
    let sum = 0;
    if (usedCoupon) {
      for (let v = 0; v < paymentList.length; v++) {
        if (
          paymentList[v].productDto.bigCategoryUid ===
            usedCoupon.available_categories_uid &&
          sum === 0
        ) {
          tempCoupon.push(usedCoupon.coupon_uid);
          sum += 1;
        } else {
          tempCoupon.push(0);
        }
      }
    } else {
      for (let v = 0; v < paymentList.length; v++) {
        tempCoupon.push(0);
      }
    }
    // 결제 정보
    let temp = {
      productName: "",
      totalPrice: temp1 - temp2,
      feePrice: temp3,
      count: paymentList.length,
    };
    if (paymentList.length !== 0) {
      temp = {
        productName:
          paymentList[0].productDto.name +
          " " +
          "외" +
          " " +
          (paymentList.length - 1).toString() +
          "개",
        totalPrice: temp1 - temp2,
        feePrice: temp3,
        count: paymentList.length,
      };
    }
    setCouponUidList(tempCoupon);
    setPriceadd(temp1);
    setcountprice(temp2);
    setDeliveryFee(temp3);
    setBasketValue(temp);
  }, [paymentList, modalOpen]);

  const showModal = () => {
    setModalOpen(true);
  };

  const deletecoupon = () => {
    setCouponDiscount(0);
  };
  return paymentList ? (
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
              <ElementTitle>
                -{couponDiscount.toLocaleString("ko-KR")}원{" "}
              </ElementTitle>
              <SelectButton onClick={showModal}>쿠폰변경</SelectButton>
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
          <ElementTitle>{deliveryFee.toLocaleString("ko-KR")}원</ElementTitle>
        </RightDiv>
      </AllDiv>
      <hr></hr>
      <AllDiv>
        <LastLeftDiv>
          <Title>최종 결제 금액</Title>
        </LastLeftDiv>
        <RightDiv>
          {(couponDiscount === -1) | (couponDiscount === 0) ? (
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
          uniqueCate={uniqueCate}
          setUsedCoupon={setUsedCoupon}
        ></MyCouponSelectModal>
      )}
    </div>
  ) : null;
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
