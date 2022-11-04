// React
import React, { useState } from "react";

// MUI
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// StyledComponents
import styled from "styled-components";
import { TableRow } from "@mui/material";
// 하위 Components
import DeliveryAddModal from "./DeliveryAddModal";
import DeliveryModifyModal from "./DeliveryModifyModal";

export default function DeliveryList() {
  const [valuenumber, setValueNumber] = useState(0);
  const [addOpen, setAddOpen] = useState(false);
  const [modifyOpen, setModifyOpen] = useState(false);
  const [basicDeliveryNumber, setBasicDeliveryNumber] = useState(0);
  const datas = [
    {
      id: 0,
      address: "수원시 권선구 금곡로 73번길 71",
      detailaddress: "405동 1803호",
      receiver: "수취인1",
      number: "번호1",
    },
    {
      id: 1,
      address: "주소2",
      detailaddress: "405동 1803호",
      receiver: "수취인2",
      number: "번호2",
    },
  ];
  const ModifyClick = (e) => {
    setModifyOpen(true);
    setValueNumber(e.id);
  };

  const dataList = datas.map((e) => (
    <TableRow key={e.id} style={{ padding: "1rem" }}>
      <td style={{ textAlign: "center", padding: "1rem" }}>
        {e.id === basicDeliveryNumber ? (
          <input
            type="radio"
            name="address"
            checked
            onClick={() => setBasicDeliveryNumber(e.id)}
          />
        ) : (
          <input
            type="radio"
            name="address"
            onClick={() => setBasicDeliveryNumber(e.id)}
          />
        )}
      </td>
      <td style={{ textAlign: "center", padding: "1rem" }}>
        {e.address} {e.detailaddress}
      </td>
      <td style={{ textAlign: "center", padding: "1rem" }}>{e.receiver}</td>
      <td style={{ textAlign: "center", padding: "1rem" }}>{e.number}</td>
      <td style={{ textAlign: "center", color: "#56a9f1", padding: "1rem" }}>
        <CreateOutlinedIcon onClick={() => ModifyClick(e)} />
      </td>
      <td style={{ textAlign: "center", color: "red", padding: "1rem" }}>
        <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
      </td>
    </TableRow>
  ));
  // const [address, setAddress] = useState("주소");
  // const [receiver, setReceiver] = useState("받는 분");
  // const [number, Setnumber] = useState("번호");

  return (
    <MyOrderContainer>
      <MajorTitle>배송지관리</MajorTitle>
      <Hr />
      <div
        style={{ display: "flex", justifyContent: "end", marginBottom: "2rem" }}
      >
        <Button onClick={() => setAddOpen(true)}>새 배송지 추가</Button>
      </div>
      <TableBox>
        <Table>
          <thead>
            <tr>
              <th>선택</th>
              <th>주소</th>
              <th>받는 분</th>
              <th>연락처</th>
              <th>수정</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>{dataList}</tbody>
        </Table>
      </TableBox>

      {addOpen && <DeliveryAddModal setAddOpen={setAddOpen}></DeliveryAddModal>}
      {modifyOpen && (
        <DeliveryModifyModal
          setModifyOpen={setModifyOpen}
          valuenumber={valuenumber}
          datas={datas}
        ></DeliveryModifyModal>
      )}
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
