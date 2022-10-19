import React, { useState, useEffect } from "react";
import DaumPostcode from "react-daum-postcode";
import styled from "styled-components";
export default function MyShippingInfo() {
  const [address, setAddress] = useState(0);
  const [openPostcode, setOpenPostcode] = useState(false);
  const [realAddress, setRealAddress] = useState("");
  const [realDetailAddress, setRealDetailAddress] = useState("");
  const [realNumber, setRealNumber] = useState("");
  const [cellphone, setCellphone] = useState("");

  const handle = {
    clickButton: () => {
      setOpenPostcode((current) => !current);
    },

    selectAddress: (data) => {
      let fullAddr = data.address;
      let extraAddr = "";

      if (data.addressType === "R") {
        if (data.bname !== "") {
          extraAddr += data.bname;
        }
        if (data.buildingName !== "") {
          extraAddr +=
            extraAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
        }
        fullAddr += extraAddr !== "" ? ` (${extraAddr})` : "";
      }
      setRealAddress(fullAddr);
      setRealNumber(data.zonecode);
      setOpenPostcode(false);
    },
  };

  // useEffect(() => {
  //   if (cellphone.length === 10) {
  //     setCellphone(cellphone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"));
  //   }
  //   if (cellphone.length === 13) {
  //     setCellphone(
  //       cellphone.replace(/-/g, "").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
  //     );
  //   }
  // }, [cellphone]);
  return (
    <div>
      <h1>배송정보</h1>
      <hr></hr>

      {address == 0 ? (
        <div>
          <ButtonDiv>
            <button onClick={() => setAddress(!address)}>
              배송지 새로 입력하기
            </button>
          </ButtonDiv>
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
            <FiveFlexDiv>
              {/* 사용자의 주소 */}
              {address == 0 ? (
                <span>부산 강서구 송정동 1627-5 000호</span>
              ) : (
                <input placeholder="주소를 입력하세요"></input>
              )}
            </FiveFlexDiv>
            <ThreeFlexDiv></ThreeFlexDiv>
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
        </div>
      ) : (
        <div>
          <ButtonDiv>
            <button onClick={() => setAddress(!address)}>
              기본 배송지로 돌아가기
            </button>
          </ButtonDiv>
          <ShipDiv>
            <TwoFlexDiv>
              <span>이름</span>
            </TwoFlexDiv>
            <EightFlexDiv>
              <input
                placeholder="받으실 분의 이름을 입력하세요."
                style={{ width: "60%", padding: "0.7rem" }}
              ></input>
            </EightFlexDiv>
          </ShipDiv>
          <ShipDiv>
            <TwoFlexDiv>
              <span>배송주소</span>
            </TwoFlexDiv>
            <EightFlexDiv>
              <button onClick={handle.clickButton}>주소 찾기</button>
              {openPostcode && (
                <DaumPostcode
                  style={postCodeStyle}
                  onComplete={handle.selectAddress} // 값을 선택할 경우 실행되는 이벤트
                  autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                />
              )}
              <div style={{ marginTop: "3rem" }}>
                {realNumber == "" ? null : (
                  <div>
                    <span>[{realNumber}]</span>
                  </div>
                )}
                {realAddress == "" ? null : (
                  <div>
                    <br></br>
                    <br></br>
                    <span>{realAddress}</span>
                  </div>
                )}
                <br></br>
                <br></br>
                <input
                  style={{ width: "60%", padding: "0.7rem" }}
                  placeholder="상세 주소를 입력하세요"
                ></input>
              </div>
            </EightFlexDiv>
          </ShipDiv>
          <ShipDiv>
            <TwoFlexDiv>
              <span>휴대폰 번호</span>
            </TwoFlexDiv>
            <EightFlexDiv>
              <input
                type="text"
                style={{ width: "60%", padding: "0.7rem" }}
                placeholder="휴대폰 번호를 입력하세요"
              ></input>
            </EightFlexDiv>
          </ShipDiv>
        </div>
      )}
    </div>
  );
}

const ShipDiv = styled.div`
  margin-top: 3rem;
  display: flex;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: right;
`;

const TwoFlexDiv = styled.div`
  flex: 2;
`;

const EightFlexDiv = styled.div`
  flex: 8;
  margin-left: 2rem;
`;

const ThreeFlexDiv = styled.div`
  flex: 2;
`;

const FiveFlexDiv = styled.div`
  flex: 5;
`;

const AddressDiv = styled.div`
  margin-left: 20%;
  width: 50%;
`;

const postCodeStyle = {
  display: "block",
  position: "relative",
  top: "0%",
  width: "100%",
  height: "400px",
  padding: "7px",
};
