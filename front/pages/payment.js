import React from "react";
import MyShippingInfo from "../components/payment/MyShippingInfo";
import PaymentProcess from "../components/payment/PaymentProcess";
import ProductSaleInfo from "../components/payment/ProductSaleInfo";
import ProductSimpleInfo from "../components/payment/ProductSimpleInfo";

export default function Payment() {
  return (
    <div>
      <h1> 결제 페이지</h1>
      <MyShippingInfo />
      <ProductSimpleInfo />
      <ProductSaleInfo />
      <PaymentProcess />
    </div>
  );
}
