import React, { useEffect, useState } from "react";
import ServiceConsulting from "../components/service/ServiceConsulting";
import ServiceFAQ from "../components/service/ServiceFAQ";
import ServiceSideNav from "../components/nav/ServiceSideNav";
import styled from "styled-components";
import { serviceNum, pageNameState } from "../states";
import { useRecoilState } from "recoil";

export default function Service() {
  // service 페이지 번호(전역)
  const [serv, setServ] = useRecoilState(serviceNum);

  // 전역으로 불러온 값을 여기에 넣어줌(서비스 페이지 컴포넌트 번호)
  const [serviceTap, setServiceTap] = useState(serviceNum);

  // 이전 페이지 주소(전역) - 다른 페이지에서 접근과 새로고침을 구분하기 위함
  const [prevUrl, setPrevUrl] = useRecoilState(pageNameState);

  // serv 값이 바뀔 때마다 useEffect (실제론 초기에 한 번만 사용됨) - Hydration 에러 방지용 (초기 UI와 렌더링 시 값이 다른 오류)
  // useRecoilState로 전역변수를 불러온 뒤 같은 페이지에서 useEffect를 사용하여 에러를 방지함
  // 전의 주소와 비교
  useEffect(() => {
    const path = window.location.pathname;
    if (prevUrl !== path) {
      setServ(0);
    } else {
      setServiceTap(serv);
    }
  }, [serv]);

  // 새로고침과 다른 페이지 접근 구분
  // 전의 주소와 비교
  useEffect(() => {
    const path = window.location.pathname;
    if (prevUrl !== path) {
      setServiceTap(0);
    } else {
    }
  }, []);

  return (
    <div>
      <AllDiv
        maxWidth="lg"
        style={{
          marginBottom: "5rem",
          display: "flex",
          justifyContent: "center",
          marginRight: "23rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "50rem",
          }}
        >
          <div style={{ flex: 1 }}>
            <ServiceSideNav setServiceTap={setServiceTap} />
          </div>
          <div style={{ flex: 4 }}>
            {serviceTap === 0 ? <ServiceFAQ /> : null}
            {serviceTap === 1 ? <ServiceConsulting /> : null}
          </div>
        </div>
      </AllDiv>
    </div>
  );
}

const AllDiv = styled.div`
  display: flex;
`;
