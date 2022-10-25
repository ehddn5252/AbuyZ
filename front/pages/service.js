import React, { useState } from "react";
import ServiceConsulting from "../components/service/ServiceConsulting";
import ServiceFAQ from "../components/service/ServiceFAQ";
import ServiceSideNav from "../components/nav/ServiceSideNav";
import styled from "styled-components";
export default function Service() {
  const [serviceTap, setServiceTap] = useState(0);
  return (
    <div>
      <AllDiv>
        <div style={{ flex: 1 }}>
          <ServiceSideNav setServiceTap={setServiceTap} />
        </div>
        {serviceTap == 0 ? (
          <div style={{ flex: 3 }}>
            <ServiceFAQ />
          </div>
        ) : (
          <div style={{ flex: 3 }}>
            <ServiceConsulting />
          </div>
        )}
      </AllDiv>
    </div>
  );
}

const AllDiv = styled.div`
  display: flex;
  padding: 5rem;
  padding-right: 10rem;
  padding-left: 10rem;
`;
