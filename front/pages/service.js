import React from "react";
import ServiceConsulting from "../components/service/ServiceConsulting";
import ServiceFAQ from "../components/service/ServiceFAQ";
import ServiceSideNav from "../components/nav/ServiceSideNav";

export default function Service() {
  return (
    <div>
      <h1> 고객센터 페이지</h1>
      <ServiceSideNav />
      <ServiceFAQ />
      <ServiceConsulting />
    </div>
  );
}
