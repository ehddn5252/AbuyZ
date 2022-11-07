// React
import React from "react";

// StyleComponents
import styled from "styled-components";

export default function ExchangeReturn() {
  return (
    <div style={{ padding: "1rem" }}>
      <h1>교환/반품 안내</h1>
      <Container>
        <p style={{ margin: 0 }}>위탁판매자정보</p>
        <p>업체명 : 롯데쇼핑(주)대전점</p>
        <p style={{ margin: 0 }}>통신판매업신고번호 : 해당없음</p>
        <p>e-mail : lotteon@lotte.net</p>
        <p style={{ margin: 0 }}>
          사업장소재지 : (35299) 대전광역시 서구 계룡로 598
        </p>
        <p>
          상품정보에 오류 또는 문의가 있을 경우, 고객센터(1899-9667)로
          연락주시면 즉시 조치하도록 하겠습니다.
        </p>
        <p style={{ fontSize: "1.3rem", color: "#000", fontWeight: "bold" }}>
          교환/반품 접수안내
        </p>
        <p>1. 마이잇다 고객센터로 이동</p>
        <p style={{ margin: 0 }}>
          2. 1:1 고객센터에서 ‘교환/반품 접수’로 카테고리 설정 후 교환 반품
          문의해주세요.
        </p>
        <p>
          마이잇다에서 접수가 어려우신 경우 잇다고객센터(1899-9667)으로 문의하여
          주시기 바랍니다.
        </p>
      </Container>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  margin-bottom: 3rem;
`;
