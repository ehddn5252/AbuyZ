// React
import React, { useEffect, useState } from "react";

// MUI
import CloseIcon from "@mui/icons-material/Close";
// StyledComponents
import styled from "styled-components";
import { TextField } from "@mui/material";
import { useRouter } from "next/router";
import DaumPostModal from "./DaumPostModal";
import { addAddress } from "../../pages/api/user";

// Alert
import Swal from "sweetalert2";

export default function DeliveryAddModal({ setAddOpen }) {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [detailaddress, setDetailAddress] = useState("");
  const [receiver, setReceiver] = useState("");
  const [number, setNumber] = useState("");
  const [postcode, setPostccode] = useState("");
  const closeModal = () => {
    setAddOpen(false);
  };
  const [addressOpen, setAddressOpen] = useState(false);

  const aadressAdd = async () => {
    const addressDto = {
      address: address,
      detailAddress: detailaddress,
      postalCode: postcode,
      recipient: receiver,
      contact: number,
    };
    const res = await addAddress(addressDto);
    closeModal();
    Swal.fire({
      title: "배송지 추가가 완료되었습니다",
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "확인",
    }).then((e) => {
      router.reload();
    });
  };

  return (
    <AddressModalContainer>
      <CloseIconDiv>
        <CloseIcon onClick={closeModal} sx={{ cursor: "pointer" }} />
      </CloseIconDiv>
      <h1>새 배송지 추가</h1>
      <div style={{ marginTop: "2rem" }}>
        <span>받으실 분</span>
        <TextField
          placeholder="이름을 입력해주세요"
          required
          fullWidth
          id="name"
          autoFocus
          name="name"
          onChange={(event) => setReceiver(event.currentTarget.value)}
        ></TextField>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <span>휴대폰</span>
        <TextField
          placeholder="번호를 입력해주세요"
          required
          fullWidth
          id="number"
          autoFocus
          name="number"
          onChange={(event) => setNumber(event.currentTarget.value)}
        ></TextField>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "2rem",
        }}
      >
        <div>
          <span>주소</span>
          <SearchButton onClick={() => setAddressOpen(true)}>
            주소 검색
          </SearchButton>

          <br></br>
          {address.length > 0 ? (
            <div style={{ marginTop: "2rem" }}>
              <span>
                [{postcode}]{address}
              </span>
              <br></br>
              <div style={{ marginTop: "2rem" }}>
                <TextField
                  placeholder="상세주소를 입력하세요"
                  fullWidth
                  required
                  onChange={(event) =>
                    setDetailAddress(event.currentTarget.value)
                  }
                ></TextField>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div style={{ marginTop: "4rem", marginBottom: "2rem" }}>
        <AddButton onClick={aadressAdd}>배송지 추가</AddButton>
      </div>
      {addressOpen && (
        <DaumPostModal
          setAddressOpen={setAddressOpen}
          setAddress={setAddress}
          setPostccode={setPostccode}
        ></DaumPostModal>
      )}
    </AddressModalContainer>
  );
}

const AddressModalContainer = styled.div`
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

const SearchButton = styled.button`
  width: 25.5rem;
  height: 3rem;
  background-color: #fff;
  border: 1px solid;
  border-color: #56a9f1;
  color: #56a9f1;
  border-radius: 5px;
`;

const AddButton = styled.button`
  width: 100%;
  height: 3rem;
  background-color: #56a9f1;
  border: none;
  color: white;
  border-radius: 5px;
`;
