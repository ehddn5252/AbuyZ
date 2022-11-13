import React, { useEffect, useState } from "react";

// MUI
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

// StyledComponents
import styled from "styled-components";

// 하위 Components
import DeliveryModifyModal from "./DeliveryModifyModal";

// api
import { delAddress } from "../../pages/api/user";
import { useRouter } from "next/router";
export default function DeliveryAddressItem({ addressItem }) {
  const router = useRouter();
  const [modifyOpen, setModifyOpen] = useState(false);
  const ModifyClick = () => {
    setModifyOpen(true);
  };

  const deleteClick = async () => {
    const res = await delAddress(addressItem.uid);
    alert("선택한 배송지를 삭제합니다.");
    router.reload();
  };

  return (
    <div>
      <div
        style={{ display: "flex", flexDirection: "row", marginTop: "1.5rem" }}
      >
        <div style={{ flex: 6, textAlign: "center" }}>
          <span>
            {addressItem.address} {addressItem.detailAddress}
          </span>
        </div>
        <div style={{ flex: 2, textAlign: "center" }}>
          <span>{addressItem.recipient}</span>
        </div>
        <div style={{ flex: 2, textAlign: "center" }}>
          <span>{addressItem.contact}</span>
        </div>
        <div style={{ flex: 1, textAlign: "center" }}>
          <CreateOutlinedIcon
            style={{ color: "#56a9f1" }}
            onClick={() => ModifyClick()}
          />
        </div>
        <div style={{ flex: 1, textAlign: "center" }}>
          <DeleteOutlineOutlinedIcon
            onClick={() => deleteClick()}
            style={{ color: "red" }}
          ></DeleteOutlineOutlinedIcon>
        </div>
      </div>
      <hr style={{ border: "0.3px solid rgb(128, 128, 128, 0.1)" }}></hr>
      {modifyOpen && (
        <DeliveryModifyModal
          setModifyOpen={setModifyOpen}
          address={addressItem.address}
          detailAddress={addressItem.detailAddress}
          recipient={addressItem.recipient}
          contact={addressItem.contact}
          postalcode={addressItem.postalCode}
          uid={addressItem.uid}
        ></DeliveryModifyModal>
      )}
    </div>
  );
}
