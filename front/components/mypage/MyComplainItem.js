// React
import React, { useState } from "react";

// MUI
import Modal from "@mui/material/Modal";

// StyledCopmoent
import styled from "styled-components";

// 하위 Components
import MyComplainModal from "./MyComplainModel";

export default function MyComplainItem({ complain }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container>
      <h3>Q. {complain.title}</h3>
      {complain.state ? (
        <CompleteDiv onClick={handleOpen}>
          <p>답변 완료</p>
        </CompleteDiv>
      ) : (
        <InCompleteDiv onClick={handleOpen}>
          <p>처리중</p>
        </InCompleteDiv>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MyComplainModal complain={complain} />
      </Modal>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CompleteDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ff9494;
  color: white;
  font-size: 1rem;
  width: 8rem;
  height: 3rem;
  border-radius: 1rem;
`;

const InCompleteDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff5e4;
  color: #ff9494;
  font-size: 1rem;
  width: 8rem;
  height: 3rem;
  border-radius: 1rem;
`;
