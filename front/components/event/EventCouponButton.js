import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getCoupon } from "../../pages/api/coupon";
// Next.js
import { useRouter } from "next/router";
// Alert
import Swal from "sweetalert2";
export default function EventCouponButton({ uid, list, setIsGiven, isgiven }) {
  const router = useRouter();
  const ClickCoupon = async () => {
    if (typeof window !== "undefined") {
      const accessToken = sessionStorage.getItem("access-token");
      if (accessToken) {
        const res = await getCoupon(uid.uid);
        console.log(res.data);
        Swal.fire({
          title: "쿠폰이 발급되었습니다.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        }).then((e) => {
          router.push("/event");
        });
      } else {
        Swal.fire({
          title: "로그인이 필요한 기능입니다.",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "확인",
        }).then((e) => {
          router.push("/login");
        });
      }
    }
  };

  useEffect(() => {
    for (var i = 0; i < list.length; i++) {
      if (list[i].coupon_uid === uid.uid) {
        setIsGiven(true);
      }
    }
  }, [isgiven]);
  return (
    <Container>
      {isgiven ? (
        <StyledNoButton disabled>쿠폰 지급 완료</StyledNoButton>
      ) : (
        <Container>
          <StyledButton onClick={ClickCoupon}>쿠폰 발급 받기</StyledButton>
          <h5 style={{ color: "#56a9f1" }}>
            쿠폰 지급 일자: {uid.start_date.slice(0, 10)}
          </h5>
        </Container>
      )}
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.button`
  padding: 6px 12px;
  border-radius: 5px;
  font-size: 1rem;
  line-height: 1.5;
  width: 8rem;
  color: white;
  border: none;
  background: #56a9f1;
`;

const StyledNoButton = styled.button`
  padding: 6px 12px;
  border-radius: 5px;
  font-size: 1rem;
  line-height: 1.5;
  width: 8rem;
  color: white;
  border: none;
  background: #aaaaaa;
`;
