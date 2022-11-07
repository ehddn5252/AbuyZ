import React, { useState } from "react";
import { useRouter } from "next/router";
// MUI
import CloseIcon from "@mui/icons-material/Close";
// StyledComponents
import styled from "styled-components";
import { TextField } from "@mui/material";
import { changeAddress } from "../../pages/api/user";
export default function DeliveryModifyModal({
  setModifyOpen,
  address,
  detailAddress,
  recipient,
  contact,
  postalcode,
  uid,
}) {
  const closeModal = () => {
    setModifyOpen(false);
  };
  const router = useRouter();

  const add = address;
  const detail = detailAddress;
  const receiver = recipient;
  const number = contact;
  const pc = postalcode;
  const [rc, setrc] = useState(receiver);
  const [nb, setnb] = useState(number);
  const [dt, setdt] = useState(detail);

  const chgAddress = async () => {
    const addressDto = {
      address: add,
      detailAddress: dt,
      postalCode: pc,
      recipient: rc,
      contact: nb,
    };
    const res = await changeAddress(addressDto, uid);
    alert("배송지 정보 수정이 완료되었습니다");
    router.reload();
  };
  return (
    <ModifyAddressContainer>
      <CloseIconDiv>
        <CloseIcon onClick={closeModal} sx={{ cursor: "pointer" }} />
      </CloseIconDiv>
      <h1>배송지 수정</h1>
      <div style={{ marginTop: "2rem" }}>
        <span>받으실 분</span>
        <TextField
          placeholder={receiver}
          required
          fullWidth
          id="name"
          autoFocus
          name="name"
          onChange={(event) => setrc(event.currentTarget.value)}
        ></TextField>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <span>휴대폰</span>
        <TextField
          placeholder={number}
          required
          fullWidth
          id="number"
          autoFocus
          name="number"
          onChange={(event) => setnb(event.currentTarget.value)}
        ></TextField>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "2rem",
        }}
      >
        <div style={{ flex: "2", marginTop: "0.5rem" }}>
          <span>주소</span>
        </div>
        <div style={{ flex: "10" }}>
          <span style={{ fontSize: "1rem", fontWeight: "bold" }}>{add}</span>
          <br></br>
          <TextField
            placeholder={detail}
            onChange={(event) => setdt(event.currentTarget.value)}
            style={{ marginTop: "2rem" }}
            fullWidth
          ></TextField>
        </div>
      </div>
      <div style={{ marginTop: "4rem", marginBottom: "2rem" }}>
        <ModifyButton onClick={chgAddress}>배송지 수정</ModifyButton>
      </div>
    </ModifyAddressContainer>
  );
}

const ModifyAddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -20%);
  width: 30rem;
  border: 2px solid #000;
  background-color: #fff;
  box-shadow: 24;
  border-radius: 5px;
  border-color: #56a9f1;
  padding: 2rem;
`;

const CloseIconDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const ModifyButton = styled.button`
  width: 100%;
  height: 3rem;
  background-color: #56a9f1;
  border: none;
  color: white;
  border-radius: 5px;
`;
