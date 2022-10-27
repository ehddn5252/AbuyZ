import React, { useState } from "react";
import ServiceConsulting from "../components/service/ServiceConsulting";
import ServiceFAQ from "../components/service/ServiceFAQ";
import ServiceSideNav from "../components/nav/ServiceSideNav";
import styled from "styled-components";
export default function Service() {
  const [serviceTap, setServiceTap] = useState(0);
  return (
    <div>
      <AllDiv
        maxWidth="lg"
        style={{
          marginBottom: "5rem",
          display: "flex",
          justifyContent: "center",
          marginRight: "23rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "50rem",
          }}
        >
          <div style={{ flex: 1 }}>
            <ServiceSideNav setServiceTap={setServiceTap} />
          </div>
          <div style={{ flex: 4 }}>
            {serviceTap === 0 ? <ServiceFAQ /> : null}
            {serviceTap === 1 ? <ServiceConsulting /> : null}
          </div>
        </div>
      </AllDiv>
    </div>
  );
}

const AllDiv = styled.div`
  display: flex;
`;
