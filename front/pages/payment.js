import React from "react";
import MyShippingInfo from "../components/payment/MyShippingInfo";
import PaymentProcess from "../components/payment/PaymentProcess";
import ProductSaleInfo from "../components/payment/ProductSaleInfo";
import ProductSimpleInfo from "../components/payment/ProductSimpleInfo";

export default function Payment() {
  return (
    <div>
      <div style={center}>
        <h1> 주문 / 결제</h1>
      </div>
      <div style={card}>
        <MyShippingInfo />
      </div>
      <div style={card}>
        <ProductSimpleInfo />
      </div>
      <div style={card}>
        <ProductSaleInfo />
      </div>
      <div style={card}>
        <PaymentProcess />
      </div>
    </div>
  );
}

const center = {
  display: "flex",
  justifyContent: "center",
  marginTop: "3rem",
};

const card = {
  padding: "5rem 20rem 5rem 20rem",
};
