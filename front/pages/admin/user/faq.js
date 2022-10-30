// React
import React, { useState } from "react";

// MUI
import Modal from "@mui/material/Modal";

// StyledComponents
import styled from "styled-components";

// 하위 Components
import FaqEditModal from "../../../components/admin/user/FaqEditModal";

export default function Faq() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const faqDataList = [
    {
      id: 0,
      title: "회원탈퇴는 어덯게 하나요?",
      content:
        "[마이롯데 > 회원 정보 관리 > 회원탈퇴 > ‘탈퇴’ 버튼 클릭 > 인증 진행/완료 후 가능하십니다. 답변이 충분하지 않으셨다면...",
    },
    {
      id: 1,
      title: "회원탈퇴는 어덯게 하나요?",
      content:
        "[마이롯데 > 회원 정보 관리 > 회원탈퇴 > ‘탈퇴’ 버튼 클릭 > 인증 진행/완료 후 가능하십니다. 답변이 충분하지 않으셨다면...",
    },
    {
      id: 2,
      title: "회원탈퇴는 어덯게 하나요?",
      content:
        "[마이롯데 > 회원 정보 관리 > 회원탈퇴 > ‘탈퇴’ 버튼 클릭 > 인증 진행/완료 후 가능하십니다. 답변이 충분하지 않으셨다면...",
    },
  ];
  const faqList = faqDataList.map((e) => (
    <TableRow key={e.id}>
      <FaqTd style={{ width: "10%" }}>
        <EditButton onClick={handleOpen}>수정</EditButton>
      </FaqTd>
      <FaqTd style={{ width: "30%" }}>{e.title}</FaqTd>
      <FaqTd style={{ width: "70%" }}>{e.content}</FaqTd>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FaqEditModal faq={e} />
      </Modal>
    </TableRow>
  ));
  return (
    <Container>
      <AddBox>
        <TitleBox>
          <TitleTag>FAQ 명</TitleTag>
          <TitleInput></TitleInput>
        </TitleBox>
        <ContentBox>
          <TitleTag>답변</TitleTag>
          <ContentInput></ContentInput>
        </ContentBox>
        <AddButton>등록</AddButton>
      </AddBox>
      <InquireBox>
        <TableBox>
          <thead style={{ width: "100%" }}>
            <tr style={{ width: "100%" }}>
              <FaqTh style={{ width: "10%" }}>수정</FaqTh>
              <FaqTh style={{ width: "30%" }}>FAQ 명</FaqTh>
              <FaqTh style={{ width: "60%" }}>답변</FaqTh>
            </tr>
          </thead>
          <tbody style={{ width: "100%" }}>{faqList}</tbody>
        </TableBox>
      </InquireBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #eeeeee;
  padding: 3rem;
  padding-left: 15rem;
`;

const AddBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 40%;
  background-color: white;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 4rem;
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: #c8c8c8;
`;
const ContentBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 16rem;
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: #c8c8c8;
`;
const TitleTag = styled.p`
  margin: 0;
  padding: 0;
  padding-left: 2rem;
  padding-top: 0.5rem;
  width: 16%;
  height: 100%;
  font-size: 1.5rem;
  background-color: #dadada;
`;
const TitleInput = styled.input`
  font-size: 1rem;
  margin: 3rem;
  height: 70%;
  width: 84%;
`;
const ContentInput = styled.textarea`
  font-size: 1rem;
  margin: 3rem;
  height: 90%;
  width: 84%;
`;
const AddButton = styled.button`
  width: 8rem;
  height: 2.5rem;
  font-size: 1.3rem;
  color: white;
  background-color: #57a9fb;
  border: none;
  cursor: pointer;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const InquireBox = styled.div`
  background-color: white;
  width: 100%;
  height: 21.5rem;
  border: 1px solid black;
`;
const TableBox = styled.table`
  background-color: white;
  margin: 0;
  width: 100%;
  height: auto;
  border-collapse: collapse;
  border-spacing: 0;
`;

const TableRow = styled.tr`
  width: 100%;
  height: 4rem;
  margin: 0;
`;

const FaqTh = styled.th`
  margin: 0;
  padding: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border: 1px solid black;
  text-align: center;
  background-color: #c5e2ff;
`;

const FaqTd = styled.td`
  margin: 0;
  padding: 1rem;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  border: 1px solid black;
  text-align: center;
`;

const EditButton = styled.button`
  width: 5rem;
  height: 2rem;
  background-color: #57a9fb;
  font-size: 1.3rem;
  color: white;
  border: none;
  cursor: pointer;
`;