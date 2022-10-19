// React
import React from "react";

// StyledCopmoent
import styled from "styled-components";

export default function MyComplainItem({ complain }) {
  return (
    <Container>
      <h1>Q. {complain.title}</h1>
      {complain.state ? (
        <CompleteDiv>
          <p>답변 완료</p>
        </CompleteDiv>
      ) : (
        <InCompleteDiv>
          <p>처리중</p>
        </InCompleteDiv>
      )}
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
  font-size: 1.5rem;
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
  font-size: 1.5rem;
  width: 8rem;
  height: 3rem;
  border-radius: 1rem;
`;
