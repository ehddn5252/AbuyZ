import React, { useState } from "react";

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
      <h1>쇼핑 FAQ</h1>
      <hr></hr>
      <div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <span>
            <button style={buttonStyle} onClick={changeFaq1}>
              point를 어디서 사용할 수 있나요?
            </button>
          </span>
          <img
            style={{ height: 30, width: 30 }}
            src={"/images/carrot.png"}
          ></img>
        </div>

        {faq1 == 1 ? (
          <div style={spanStyle}>
            <span>어디서 사용할 수 있습니다</span>
          </div>
        ) : null}
      </div>
      <hr></hr>
      <div>
        <span>
          <button style={buttonStyle} onClick={changeFaq2}>
            비밀번호 변경을 어떻게 하나요?
          </button>
          <hr></hr>
        </span>
        {faq2 == 1 ? (
          <div style={spanStyle}>
            <span>어디서 사용할 수 있습니다</span>
          </div>
        ) : null}
      </div>
      <div>
        <span>
          <button style={buttonStyle} onClick={changeFaq3}>
            상품을 받은 후 반품접수는 어떻게 하나요?
          </button>
          <hr></hr>
        </span>
        {faq3 == 1 ? (
          <div style={spanStyle}>
            <span>어디서 사용할 수 있습니다</span>
          </div>
        ) : null}
      </div>
      <div>
        <span>
          <button style={buttonStyle} onClick={changeFaq4}>
            회원탈퇴는 어떻게 하나요?
          </button>
          <hr></hr>
        </span>
        {faq4 == 1 ? (
          <div style={spanStyle}>
            <span>
              마이롯데 > 회원 정보 관리 > 회원탈퇴 > ‘탈퇴’ 버튼 클릭 > 인증
              진행/완료 후 가능하십니다. <br></br>
              <br></br>답변이 충분하지 않으셨다면 1:1 문의하기 또는 고객센터
              전화상담을 이용해주시기 바랍니다. 감사합니다.
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

const buttonStyle = {
  backgroundColor: "white",
  border: "none",
  padding: "1rem",
};

const spanStyle = {
  backgroundColor: "#E0E0E0",
  padding: "3rem",
};
