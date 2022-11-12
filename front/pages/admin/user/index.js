// React
import React, { useState } from "react";

// StyledComponents
import styled from "styled-components";

// 하위 Components
import ServiceCategory from "../../../components/admin/user/ServiceCategory";
import ServiceList from "../../../components/admin/user/ServiceList";

// api
import { searchCustomerCenter } from "../../api/admin";

export default function User() {
  // 유무확인
  const [search, setSearch] = useState(false);

  const [inquirys, setInquirys] = useState([
    {
      uid: 0,
      writer: "",
      status: "",
      content: "",
      title: "",
      start_date: "",
      end_date: "",
      category_name: "",
    },
  ]);

  const [searchDto, setSearchDto] = useState({
    // customerCenterCategory: "",
    // title: "",
  });

  const loadData = async (searchDto) => {
    const res = await searchCustomerCenter(searchDto);
    setInquirys(res.data);
    // console.log(res.data);
  };

  const buttonClick = () => {
    loadData(searchDto);
  };

  return (
    <Container>
      <ServiceCategory
        setSearch={setSearch}
        setSearchDto={setSearchDto}
        buttonClick={buttonClick}
      />
      {search ? <ServiceList inquirys={inquirys} /> : null}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #edf0f5;
  padding: 3rem;
  padding-left: 15rem;
  min-height: 89vh;
`;
