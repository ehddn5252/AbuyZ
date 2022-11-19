import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DeliveryListModal from "./DeliveryListModal";
import { getAddress } from "../../pages/api/user";
export default function MyShippingInfo() {
  const [postcode, setPostcode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressModalOpen, settAddressModalOpen] = useState(false);
  const [addressList, setAddressList] = useState([]);

  const myaddress = async () => {
    const res = await getAddress();
    setAddressList(res.data.data);
    setPostcode(res.data.data[0].postalCode);
    setAddress(res.data.data[0].address);
    setDetailAddress(res.data.data[0].detailAddress);
    setName(res.data.data[0].recipient);
    setPhone(res.data.data[0].contact);
  };

  useEffect(() => {
    myaddress();
  }, []);
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
          addressList={addressList}
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
  cursor: pointer;
`;
