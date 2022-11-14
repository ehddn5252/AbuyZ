import React, { useState } from "react";
import styled from "styled-components";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function serviceFaqItem({ setAnswerOpen, e, answerOpen, idx }) {
  const [selected, setSelected] = useState(-1);
  const clickhandle = () => {
    setAnswerOpen(!answerOpen);
    setSelected(idx);
  };
  return (
    <div style={{ borderBottom: "1px solid rgba(128, 128, 128, 0.17)" }}>
      <RowDiv onClick={clickhandle}>
        <div style={{ flex: 11 }}>
          <span>{e.question}</span>
        </div>
        <div style={{ flex: 1 }}>
          <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
        </div>
      </RowDiv>
      {(selected === idx) & answerOpen ? (
        <SpanStyle>
          <span>{e.answer}</span>
        </SpanStyle>
      ) : null}
    </div>
  );
}

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  height: 3rem;
  align-items: center;
  &:hover span {
    color: #56a9f1;
    cursor: pointer;
  }
`;

const SpanStyle = styled.div`
  margin-top: 1rem;
  background-color: rgba(128, 128, 128, 0.17);
  border: none;
  padding: 3rem;
  border-radius: 5px;
  margin-bottom: 1rem;
`;
