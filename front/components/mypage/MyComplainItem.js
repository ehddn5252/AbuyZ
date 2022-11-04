// React
import React, { useState } from "react";

// StyledCopmoent
import styled from "styled-components";

export default function MyComplainItem({ complain }) {
  const [answerOpen, setAnswerOpen] = useState(false);
  const ansOpen = () => setAnswerOpen(!answerOpen);

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
            <CompleteDiv onClick={ansOpen}>
              <p>답변 완료</p>
            </CompleteDiv>
          ) : (
            <InCompleteDiv>
              <p>처리중</p>
            </InCompleteDiv>
          )}
        </div>
      </div>

      {answerOpen ? (
        <ContentDiv>
          <div style={{ padding: "2rem" }}>
            <span>{complain.content}</span>
          </div>
        </ContentDiv>
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  border-bottom: 1px solid;
  border-color: rgba(128, 128, 128, 0.17);
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const CompleteDiv = styled.div`
  background-color: #56a9f1;
  color: white;
  width: 7rem;
  font-size: 1rem;
  border: none;
  height: 2rem;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const InCompleteDiv = styled.div`
  background-color: rgba(182, 193, 232, 0.55);
  color: #56a9f1;
  width: 7rem;
  font-size: 1rem;
  border: none;
  height: 2rem;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentDiv = styled.div`
  width: 100%;
  background-color: rgba(128, 128, 128, 0.17);
  margin-top: 1rem;
  border-radius: 5px;
`;
