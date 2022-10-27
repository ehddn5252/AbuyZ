// React
import { TableRow } from "@mui/material";
import React from "react";

// StyledComponents
import styled from "styled-components";

export default function MyCouponItem({ couponList }) {
  const dataList = couponList.map((e) => (
    <TableRow key={e.id}>
      <td style={{ textAlign: "center", padding: "1rem" }}>{e.couponName}</td>
      <td style={{ textAlign: "center", padding: "1rem" }}>{e.saleprice}</td>
      <td style={{ textAlign: "center", padding: "1rem" }}>{e.startPeriod}</td>
      <td style={{ textAlign: "center", padding: "1rem" }}>
        {e.expirationPeriod}
      </td>
      <td style={{ textAlign: "center", padding: "1rem" }}>
        {e.used === true ? <span>아직 사용 전</span> : <span>사용 완료</span>}
      </td>
    </TableRow>
  ));

  return (
    <CouponContainer>
      <DailyTable>
        <thead style={{ padding: "2rem" }}>
          <tr>
            <th>쿠폰 이름</th>
            <th>쿠폰 할인금액(원)</th>
            <th>쿠폰 시작 일시</th>
            <th>쿠폰 끝 일시</th>
            <th>사용 여부</th>
          </tr>
        </thead>

        <tbody>{dataList}</tbody>
      </DailyTable>
    </CouponContainer>
  );
}

const CouponContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const DailyTable = styled.table`
  width: 100%;
`;
