// React
import React, { useState } from "react";

// MUI
import Box from "@mui/material/Box";

// StyledComponents
import styled from "styled-components";

// 하위 Components
import ServiceCategory from "../../../components/admin/user/ServiceCategory";
import ServiceList from "../../../components/admin/user/ServiceList";

export default function User() {
  // 유무확인
  const [search, setSearch] = useState(false);

  return (
    <Container>
      <ServiceCategory setSearch={setSearch} />
      {search ? <ServiceList /> : null}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #edf0f5;
  padding: 3rem;
  padding-left: 15rem;
  height: 89vh;
`;
