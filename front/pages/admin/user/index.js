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
      <Box>
        <Box>
          <ServiceCategory setSearch={setSearch} />
          {search ? <ServiceList /> : null}
        </Box>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  background: #edf0f5;
  height: 88vh;
  padding: 3rem;
  padding-left: 15rem;
`;
