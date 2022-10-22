// React
import React from "react";

// StyledComponent
import styled from "styled-components";

export default function ServiceCategory() {
  return (
    <Container>
      <h1>카데고리</h1>
      <hr style={{ color: "#aaaaaa" }} />
      <p>문의사항</p>
      <p>해결유무</p>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 5rem;
`;
