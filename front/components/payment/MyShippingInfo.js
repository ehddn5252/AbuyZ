import React from "react";

export default function MyShippingInfo() {
  return (
    <div>
      <div style={{ marginTop: "3rem", display: "flex" }}>
        <div style={{ flex: 5 }}>
          <span style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
            배송정보
          </span>
        </div>
        <div style={{ flex: 5 }}>
          <span>
            받는 분, 배송지, 전화번호를 변경하시려면 마이페이지 > 내 정보
            관리에서 수정해주세요.
          </span>
        </div>
      </div>
      <hr></hr>
      <div style={{ marginTop: "3rem", display: "flex" }}>
        <div style={{ flex: 2 }}>
          <span>받는 분</span>
        </div>
        <div style={{ flex: 8 }}>
          <span>최지은</span>
        </div>
      </div>
      <div style={{ marginTop: "3rem", display: "flex" }}>
        <div style={{ flex: 2 }}>
          <span>받는 분</span>
        </div>
        <div style={{ flex: 8 }}>
          <span>최지은</span>
        </div>
      </div>
      <div style={{ marginTop: "3rem", display: "flex" }}>
        <div style={{ flex: 2 }}>
          <span>주문메모</span>
        </div>
        <div style={{ flex: 8 }}>
          <span>010-0000-1234</span>
        </div>
      </div>
    </div>
  );
}
