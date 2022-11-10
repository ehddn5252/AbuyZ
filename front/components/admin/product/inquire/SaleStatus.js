import React, { useState, useEffect } from "react";
import styled from "styled-components";

// mui
import Grid2 from "@mui/material/Unstable_Grid2";

export default function SaleStatus(props) {
  // 옵션 체크
  const checkOnlyOne = (checkThis) => {
    const checkboxes = document.getElementsByName("saleStatusCheck");
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== checkThis) {
        checkboxes[i].checked = false;
      } else if (checkboxes[i] === checkThis) {
        if (props.checkStatus === i) {
          props.setCheckStatus(0);
        } else {
          props.setCheckStatus(i);
        }
      }
    }
  };

  // 리셋 감지기
  // 부모 컴포넌트에서 숫자가 올라간 것을 감지해 리셋시킴
  useEffect(() => {
    const checkboxes = document.getElementsByName("saleStatusCheck");
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
    props.setCheckStatus(0);
  }, [props.reset]);

  return (
    <Grid2 sx={{ padding: "0", display: "flex" }}>
      <Grid2
        xs={2}
        sx={{
          padding: "0",
          background: "#DADADA",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
          fontWeight: "600",
        }}
      >
        판매상태
      </Grid2>
      <Grid2
        xs={10}
        sx={{ padding: "1rem", paddingLeft: "1.5rem", display: "flex" }}
      >
        <input
          name="saleStatusCheck"
          type="checkbox"
          onChange={(e) => checkOnlyOne(e.target)}
          style={{
            width: "1.2rem",
            height: "1.5rem",
            marginLeft: "3.5rem",
            marginRight: "0.5rem",
          }}
        />
        <Name>전체</Name>
        <input
          name="saleStatusCheck"
          type="checkbox"
          onChange={(e) => checkOnlyOne(e.target)}
          style={{ width: "1.2rem", height: "1.5rem", marginRight: "0.5rem" }}
        />
        <Name>판매중</Name>
        <input
          name="saleStatusCheck"
          type="checkbox"
          onChange={(e) => checkOnlyOne(e.target)}
          style={{ width: "1.2rem", height: "1.5rem", marginRight: "0.5rem" }}
        />
        <Name>승인대기</Name>
        <input
          name="saleStatusCheck"
          type="checkbox"
          onChange={(e) => checkOnlyOne(e.target)}
          style={{ width: "1.2rem", height: "1.5rem", marginRight: "0.5rem" }}
        />
        <Name>판매완료</Name>
      </Grid2>
    </Grid2>
  );
}

const Name = styled.p`
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  margin-right: 1.5rem;
`;
