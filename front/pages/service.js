import React, { useState } from "react";
import ServiceConsulting from "../components/service/ServiceConsulting";
import ServiceFAQ from "../components/service/ServiceFAQ";
import ServiceSideNav from "../components/nav/ServiceSideNav";

export default function Service() {
  const [serviceTap, setServiceTap] = useState(0);
  return (
    <div>
      <div style={{ display: "flex" }}>
        <ServiceSideNav setServiceTap={setServiceTap} style={{ flex: 1 }} />
        {serviceTap == 0 ? (
          <div style={{ flex: 4 }}>
            <ServiceFAQ />
          </div>
        ) : (
          <div style={{ flex: 4 }}>
            <ServiceConsulting />
          </div>
        )}
      </div>
    </div>
  );
}
