// React
import React, { useState } from "react";

// StyledCopmoent
import styled from "styled-components";

export default function MyComplainItem({ complain }) {
  const [answerOpen, setAnswerOpen] = useState(false);

  const ansOpen = () => {
    setContentOpen(!contentOpen);
    setAnswerOpen(!answerOpen);
  };
  const [contentOpen, setContentOpen] = useState(false);

  return (
    <Container>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{ flex: "10" }}
          onClick={() => setContentOpen(!contentOpen)}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <ComplainTitle>
              [{complain.customerCenterCategory}] {complain.title}
              <br></br>
              <span style={{ color: "#aaaaaa" }}>
                {/* {complain.start_date.slice(0, 10)}{" "}
                {complain.start_date.slice(11, 16)} */}
              </span>
            </ComplainTitle>

            {contentOpen ? (
              <ComplainContent>
                <span>{complain.content}</span>
              </ComplainContent>
            ) : null}
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
  background-color: rgba(86, 169, 241, 0.07);
  margin-top: 1rem;
  border-radius: 5px;
`;

const ComplainContent = styled.div`
  width: 100%;
  background-color: rgba(128, 128, 128, 0.1);
  margin-top: 1rem;
  border-radius: 5px;
  padding: 2rem;
`;

const ComplainTitle = styled.span`
  &:hover {
    cursor: pointer;
  }
`;
