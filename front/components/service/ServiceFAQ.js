import React, { useState } from "react";
import styled from "styled-components";

export default function ServiceFAQ() {
  const [faq1, setFaq1] = useState(0);
  const [faq2, setFaq2] = useState(0);
  const [faq3, setFaq3] = useState(0);
  const [faq4, setFaq4] = useState(0);

  const changeFaq1 = () => {
    setFaq1(!faq1);
    setFaq2(0);
    setFaq3(0);
    setFaq4(0);
  };

  const changeFaq2 = () => {
    setFaq1(0);
    setFaq2(!faq2);
    setFaq3(0);
    setFaq4(0);
  };

  const changeFaq3 = () => {
    setFaq1(0);
    setFaq2(0);
    setFaq3(!faq3);
    setFaq4(0);
  };

  const changeFaq4 = () => {
    setFaq1(0);
    setFaq2(0);
    setFaq3(0);
    setFaq4(!faq4);
  };
  return (
    <div>
      <div>
        <h1>쇼핑 FAQ</h1>
      </div>

      <ColoredLine color="red"></ColoredLine>
      <RowDiv onClick={changeFaq1}>
        <div style={{ flex: 7 }}>
          <span>point를 어디서 사용할 수 있나요?</span>
        </div>
        <div style={{ flex: 1 }}>
          <img
            style={{ height: 20, width: 20 }}
            src={"/images/bottom-arrow.png"}
          ></img>
        </div>
      </RowDiv>
      {faq1 == 1 ? (
        <SpanStyle>
          <span>바이즈에서는 현재 포인트 서비스를 운영하고 있지 않습니다.</span>
          <br></br>
          <span>
            대신, 쿠폰 사용은 가능합니다. 이벤트 몰 혹은 마이페이지 > 내 쿠폰을
            확인해주세요.
          </span>
        </SpanStyle>
      ) : null}

      <hr></hr>
      <RowDiv onClick={changeFaq2}>
        <div style={{ flex: 7 }}>
          <span>비밀번호 변경을 어떻게 하나요?</span>
        </div>
        <div style={{ flex: 1 }}>
          <img
            style={{ height: 20, width: 20 }}
            src={"/images/bottom-arrow.png"}
          ></img>
        </div>
      </RowDiv>
      {faq2 == 1 ? (
        <SpanStyle>
          <span>비밀번호 변경은 마이페이지 > 내 정보 수정에서 가능합니다.</span>
        </SpanStyle>
      ) : null}

      <hr></hr>
      <RowDiv onClick={changeFaq3}>
        <div style={{ flex: 7 }}>
          <span>상품을 받은 후 반품접수는 어떻게 하나요?</span>
        </div>
        <div style={{ flex: 1 }}>
          <img
            style={{ height: 20, width: 20 }}
            src={"/images/bottom-arrow.png"}
          ></img>
        </div>
      </RowDiv>
      {faq3 == 1 ? (
        <SpanStyle>
          <span>
            상품을 받으신 후에, 고객센터 > 1:1 문의하기에 교환/환불을 클릭하신
            후 접수 가능합니다.
          </span>
          <br></br>
          <span>
            단, 정상 상품에 한해 교환/ 환불이 가능하므로, 상품 확인에 대해서는
            수일이 소요될 수 있습니다.
          </span>
        </SpanStyle>
      ) : null}

      <hr></hr>
      <RowDiv onClick={changeFaq4}>
        <div style={{ flex: 7 }}>
          <span>회원탈퇴는 어떻게 하나요?</span>
        </div>
        <div style={{ flex: 1 }}>
          <img
            style={{ height: 20, width: 20 }}
            src={"/images/bottom-arrow.png"}
          ></img>
        </div>
      </RowDiv>
      {faq4 == 1 ? (
        <SpanStyle>
          <span>
            마이롯데 > 회원 정보 관리 > 회원탈퇴 > ‘탈퇴’ 버튼 클릭 > 인증
            진행/완료 후 가능하십니다. <br></br>
            <br></br>답변이 충분하지 않으셨다면 1:1 문의하기 또는 고객센터
            전화상담을 이용해주시기 바랍니다. <br></br>감사합니다.
          </span>
        </SpanStyle>
      ) : null}
    </div>
  );
}

const SpanStyle = styled.div`
  background-color: white;
  border: 1px #ff7171 solid;
  padding: 3rem;
`;

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 5,
    }}
  />
);

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  height: 3rem;
  align-items: center;
  &:hover {
    background-color: #e0e0e0;
  }
`;
