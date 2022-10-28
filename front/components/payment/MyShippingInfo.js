import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DeliveryListModal from "./DeliveryListModal";
export default function MyShippingInfo() {
  const [postcode, setPostcode] = useState("16892");
  const [address, setAddress] = useState(
    "녹산 송정동 1627-5 그린코어 오피스텔"
  );
  const [detailAddress, setDetailAddress] = useState("691호");
  const [name, setName] = useState("최지은");
  const [phone, setPhone] = useState("01096674657");
  const [addressModalOpen, settAddressModalOpen] = useState(false);
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>배송정보</span>
        <Button onClick={() => settAddressModalOpen(!addressModalOpen)}>
          배송지 선택
        </Button>
      </div>
      <hr></hr>
      <div style={{ marginLeft: "1rem" }}>
        <ShipDiv>
          <TwoFlexDiv>
            <span>받는 분</span>
          </TwoFlexDiv>
          <EightFlexDiv>
            {/* 사용자의 이름 */}
            <span>{name}</span>
          </EightFlexDiv>
        </ShipDiv>
        <ShipDiv>
          <TwoFlexDiv>
            <span>배송지</span>
          </TwoFlexDiv>
          <EightFlexDiv>
            <span>
              [{postcode}] {address} {detailAddress}
            </span>
          </EightFlexDiv>
        </ShipDiv>
        <ShipDiv>
          <TwoFlexDiv>
            <span>휴대폰 번호</span>
          </TwoFlexDiv>
          <EightFlexDiv>
            {/* 사용자의 핸드폰번호 */}
            <span>{phone}</span>
          </EightFlexDiv>
        </ShipDiv>
      </div>
      {addressModalOpen ? (
        <DeliveryListModal
          settAddressModalOpen={settAddressModalOpen}
          setPostcode={setPostcode}
          setAddress={setAddress}
          setDetailAddress={setDetailAddress}
          setName={setName}
          setPhone={setPhone}
        ></DeliveryListModal>
      ) : null}
    </div>
  );
}

const ShipDiv = styled.div`
  display: flex;
  margin-top: 1rem;
`;
const TwoFlexDiv = styled.div`
  flex: 2;
`;

const EightFlexDiv = styled.div`
  flex: 8;
  margin-left: 2rem;
`;

const Button = styled.button`
  background-color: white;
  color: #56a9f1;
  border: 2px solid #56a9f1;
  border-radius: 5px;
  height: 2rem;
  width: 7rem;
  font-weight: bold;
`;
