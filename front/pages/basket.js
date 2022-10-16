import React from "react";
import BasketList from "../components/payment/BasketList";
import BasketPayment from "../components/payment/BasketPayment";

export default function Basket() {
  return (
    <div>
      <h1> 장바구니 페이지</h1>
      <BasketList />
      <BasketPayment />
    </div>
  );
}
