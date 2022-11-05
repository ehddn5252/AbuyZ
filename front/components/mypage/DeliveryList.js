// React
import React, { useEffect, useState } from "react";

// MUI
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

// StyledComponents
import styled from "styled-components";
import { TableRow } from "@mui/material";

// 하위 Components
import DeliveryAddModal from "./DeliveryAddModal";
import DeliveryModifyModal from "./DeliveryModifyModal";
import DeliveryAddressItem from "./DeliveryAddressItem";
// api
import { getAddress } from "../../pages/api/user";
import { useRouter } from "next/router";

export default function DeliveryList() {
  const [addOpen, setAddOpen] = useState(false);
  const [addressList, setAddressList] = useState([]);

  const aaddress = async () => {
    const res = await getAddress();
    setAddressList(res.data.data);
  };

  useEffect(() => {
    aaddress();
  }, []);

  return (
    <MyOrderContainer>
      <MajorTitle>배송지관리</MajorTitle>
      <Hr />
      <div
        style={{ display: "flex", justifyContent: "end", marginBottom: "2rem" }}
      >
        <Button onClick={() => setAddOpen(true)}>새 배송지 추가</Button>
      </div>
      <hr></hr>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flex: 6, textAlign: "center" }}>
          <span>주소</span>
        </div>
        <div style={{ flex: 2, textAlign: "center" }}>
          <span>받는</span>
          <span>분</span>
        </div>
        <div style={{ flex: 2, textAlign: "center" }}>
          <span>연락처</span>
        </div>
        <div style={{ flex: 1, textAlign: "center" }}>
          <span>수정</span>
        </div>
        <div style={{ flex: 1, textAlign: "center" }}>
          <span>삭제</span>
        </div>
      </div>
      <hr></hr>
      {addressList.map((e) => (
        <DeliveryAddressItem key={e.uid} addressItem={e}></DeliveryAddressItem>
      ))}
      {addOpen && <DeliveryAddModal setAddOpen={setAddOpen}></DeliveryAddModal>}
    </MyOrderContainer>
  );
}

const MyOrderContainer = styled.div`
  margin-top: 4.5rem;
  margin-bottom: 4rem;
  height: 50rem;
  width: 56rem;
`;

const MajorTitle = styled.span`
  font-size: 2rem;
`;
const Hr = styled.hr`
  height: 0.3rem;
  background: #7895b2;
  border-radius: 1rem;
`;

const Button = styled.button`
  background-color: white;
  border: 1px solid;
  border-color: #56a9f1;
  height: 2rem;
  width: 8rem;
  color: #56a9f1;
  border-radius: 5px;
`;

const Table = styled.table`
  width: 100%;
`;

const TableBox = styled.div`
  width: 100%;
  height: 29rem;
  /* padding: 0.5rem; */
  background-color: white;
`;
