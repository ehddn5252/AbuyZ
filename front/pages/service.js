import React, { useState } from "react";
import ServiceConsulting from "../components/service/ServiceConsulting";
import ServiceFAQ from "../components/service/ServiceFAQ";
import ServiceSideNav from "../components/nav/ServiceSideNav";

export default function Service() {
  const [serviceTap, setServiceTap] = useState(0);
  return (
    <div>
      <div
        style={{
          display: "flex",
          padding: "5rem",
          paddingRight: "10rem",
          paddingLeft: "10rem",
        }}
      >
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
      </div>
    </div>
  );
}
