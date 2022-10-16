import React from "react";
import ServiceCategory from "../../components/admin/user/ServiceCategory";
import ServiceList from "../../components/admin/user/ServiceList";
export default function User() {
  return (
    <div>
      <h1> 유저관리 페이지</h1>
      <ServiceCategory />
      <ServiceList />
    </div>
  );
}
