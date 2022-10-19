import React from "react";
import styled from "styled-components";
export default function MyShippingInfo() {
  return (
    <RelativeDiv>
      <h1>배송정보</h1>
      <hr></hr>
      <InfoDiv>
        <span>
          받는 분, 배송지, 휴대폰 번호를 변경하시려면 마이페이지 > 내 정보
          관리에서 변경해주세요.
        </span>
      </InfoDiv>
      <ShipDiv>
        <TwoFlexDiv>
          <span>받는 분</span>
        </TwoFlexDiv>
        <EightFlexDiv>
          {/* 사용자의 이름 */}
          <span>최지은</span>
        </EightFlexDiv>
      </ShipDiv>
      <ShipDiv>
        <TwoFlexDiv>
          <span>배송지</span>
        </TwoFlexDiv>
        <EightFlexDiv>
          {/* 사용자의 주소 */}
          <span>부산 강서구 송정동 1627-5 000호</span>
        </EightFlexDiv>
      </ShipDiv>
      <ShipDiv>
        <TwoFlexDiv>
          <span>휴대폰 번호</span>
        </TwoFlexDiv>
        <EightFlexDiv>
          {/* 사용자의 핸드폰번호 */}
          <span>010-0000-1234</span>
        </EightFlexDiv>
      </ShipDiv>
    </RelativeDiv>
  );
}

const RelativeDiv = styled.div`
  position: relative;
`;

const InfoDiv = styled.div`
  position: absolute;
  top: 12%;
  right: 0%;
`;

const ShipDiv = styled.div`
  margin-top: 3rem;
  display: flex;
`;

const TwoFlexDiv = styled.div`
  flex: 2;
`;

const EightFlexDiv = styled.div`
  flex: 8;
`;
