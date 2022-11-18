// React
import React, { useState, useEffect } from "react";

// MUI
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";

// StyledComponents
import styled from "styled-components";

// Next.js
import { useRouter } from "next/router";

export default function AdminSideNav() {
  const router = useRouter();
  const [location, setLocation] = useState("대시보드");

  const path = {
    대시보드: "/admin/dashboard",
    정보수정: "/admin/account",
    "전시관리 - 쿠폰": "/admin/coupon",
    "전시관리 - 이벤트": "/admin/event",
    "상품관리 - 상품조회": "/admin/product",
    "상품관리 - 상품등록": "/admin/product/add",
    "상품관리 - 상품수정": "/admin/product/edit",
    "고객관리 - 문의": "/admin/user/ask",
    "고객관리 - FAQ": "/admin/user/faq",
    "고객관리 - 신고": "/admin/user/report",
    "고객관리 - 리뷰": "/admin/user/review",
    통계: "/admin/chart",
  };
  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname === "/admin/account") setLocation("정보수정");
    else if (pathname === "/admin/chart") setLocation("통계");
    else if (pathname === "/admin/coupon") setLocation("전시관리 - 쿠폰");
    else if (pathname === "/admin/dashboard") setLocation("대시보드");
    else if (pathname === "/admin/event") setLocation("전시관리 - 이벤트");
    else if (pathname === "/admin/product") setLocation("상품관리 - 상품조회");
    else if (pathname === "/admin/product/add")
      setLocation("상품관리 - 상품등록");
    else if (pathname === "/admin/product/edit")
      setLocation("상품관리 - 상품수정");
    else if (pathname === "/admin/user/ask") setLocation("고객관리 - 문의");
    else if (pathname === "/admin/user/faq") setLocation("고객관리 - FAQ");
    else if (pathname === "/admin/user/report") setLocation("고객관리 - 신고");
    else if (pathname === "/admin/user/review") setLocation("고객관리 - 리뷰");
  }, [router.pathname]);

  const goHome = (pathname) => {
    router.push(path[pathname]);
  };

  return (
    <SideNavContainer>
      <LogoDiv onClick={(e) => goHome("대시보드")}>
        <img src="/images/ABUYZ_LOGO.png" style={{ width: "6rem" }} />
        <p>셀러오피스</p>
      </LogoDiv>

      <hr style={{ width: "100%", marginBottom: 0 }} />
      <HighTag
        style={location === "대시보드" ? { backgroundColor: "#1A6DFF" } : null}
      >
        <GridViewOutlinedIcon />
        <TagLink onClick={(e) => goHome("대시보드")}>대시보드</TagLink>
      </HighTag>
      <TitleGrid
        style={
          location === "상품관리 - 상품조회" ||
          location === "상품관리 - 상품등록" ||
          location === "상품관리 - 상품수정"
            ? { backgroundColor: "#1A6DFF" }
            : null
        }
      >
        <CardGiftcardOutlinedIcon />
        <TitleTag>상품관리</TitleTag>
      </TitleGrid>

      <div>
        <LowerTag>
          <LowLink
            onClick={(e) => goHome("상품관리 - 상품조회")}
            style={
              location === "상품관리 - 상품조회" ||
              location === "상품관리 - 상품수정"
                ? { color: "#fff", fontWeight: "1000" }
                : null
            }
          >
            - 상품조회
          </LowLink>
        </LowerTag>
        <LowerTag>
          <LowLink
            onClick={(e) => goHome("상품관리 - 상품등록")}
            style={
              location === "상품관리 - 상품등록"
                ? { color: "#fff", fontWeight: "1000" }
                : null
            }
          >
            - 상품등록
          </LowLink>
        </LowerTag>
      </div>
      <TitleGrid
        style={
          location === "고객관리 - 문의" ||
          location === "고객관리 - 신고" ||
          location === "고객관리 - 리뷰" ||
          location === "고객관리 - FAQ"
            ? { backgroundColor: "#1A6DFF" }
            : null
        }
      >
        <SupportAgentOutlinedIcon />
        <TitleTag>고객관리</TitleTag>
      </TitleGrid>
      <div>
        <LowerTag>
          <LowLink
            onClick={(e) => goHome("고객관리 - 문의")}
            style={
              location === "고객관리 - 문의"
                ? { color: "#fff", fontWeight: "1000" }
                : null
            }
          >
            - 문의관리
          </LowLink>
        </LowerTag>
        <LowerTag>
          <LowLink
            onClick={(e) => goHome("고객관리 - 신고")}
            style={
              location === "고객관리 - 신고"
                ? { color: "#fff", fontWeight: "1000" }
                : null
            }
          >
            - 신고관리
          </LowLink>
        </LowerTag>
        <LowerTag>
          <LowLink
            onClick={(e) => goHome("고객관리 - 리뷰")}
            style={
              location === "고객관리 - 리뷰"
                ? { color: "#fff", fontWeight: "1000" }
                : null
            }
          >
            - 리뷰관리
          </LowLink>
        </LowerTag>
        <LowerTag>
          <LowLink
            onClick={(e) => goHome("고객관리 - FAQ")}
            style={
              location === "고객관리 - FAQ"
                ? { color: "#fff", fontWeight: "1000" }
                : null
            }
          >
            - FAQ
          </LowLink>
        </LowerTag>
      </div>
      <TitleGrid
        style={
          location === "전시관리 - 이벤트" || location === "전시관리 - 쿠폰"
            ? { backgroundColor: "#1A6DFF" }
            : null
        }
      >
        <LocalActivityOutlinedIcon />
        <TitleTag>전시관리</TitleTag>
      </TitleGrid>

      <div>
        <LowerTag>
          <LowLink
            onClick={(e) => goHome("전시관리 - 쿠폰")}
            style={
              location === "전시관리 - 쿠폰"
                ? { color: "#fff", fontWeight: "1000" }
                : null
            }
          >
            - 쿠폰
          </LowLink>
        </LowerTag>
        <LowerTag>
          <LowLink
            onClick={(e) => goHome("전시관리 - 이벤트")}
            href="/admin/event"
            style={
              location === "전시관리 - 이벤트"
                ? { color: "#fff", fontWeight: "1000" }
                : null
            }
          >
            - 이벤트
          </LowLink>
        </LowerTag>
      </div>

      <HighTag
        style={location === "통계" ? { backgroundColor: "#1A6DFF" } : null}
      >
        <ShowChartOutlinedIcon />
        <TagLink onClick={(e) => goHome("통계")}>통계</TagLink>
      </HighTag>
    </SideNavContainer>
  );
}

const SideNavContainer = styled.div`
  display: flex;
  position: fixed;
  padding: 0;
  margin: 0;
  flex-direction: column;
  padding-top: 2rem;
  width: 12rem;
  height: 100%;
  background-color: #353535;
  color: #eeeeee;
  z-index: 1000;
`;

const LogoDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const TitleGrid = styled(Grid)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 0.5rem;
`;
const TitleTag = styled(Typography)`
  font-size: 1.2rem;
  color: #fff;
  padding: 0.5rem;
  font-weight: 1000;
`;

const TagLink = styled.div`
  text-decoration: none;
  color: #fff;
  margin-left: 0.5rem;
  cursor: pointer;
`;

const HighTag = styled(Typography)`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 1000;
  padding: 0.5rem;
`;

const LowerTag = styled(Typography)`
  padding: 0.5rem;
`;

const LowLink = styled.div`
  text-decoration: none;
  color: #8e8e8e;
  margin-left: 2rem;
  cursor: pointer;
`;
