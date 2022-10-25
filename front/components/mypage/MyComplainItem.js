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
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flex: "10" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>
              [{complain.category}] {complain.title}
            </span>
            <span style={{ color: "#aaaaaa" }}>{complain.date}</span>
          </div>
        </div>
        <div style={{ flex: "2" }}>
          {complain.state ? (
            <CompleteDiv onClick={handleOpen}>
              <p>답변 완료</p>
            </CompleteDiv>
          ) : (
            <InCompleteDiv onClick={handleOpen}>
              <p>처리중</p>
            </InCompleteDiv>
          )}
        </div>
      </div>

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
  border-bottom: 1px solid black;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const CompleteDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #56a9f1;
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
  background-color: rgba(182, 193, 232, 0.55);
  color: #56a9f1;
  font-size: 1rem;
  width: 8rem;
  height: 3rem;
  border-radius: 1rem;
`;
