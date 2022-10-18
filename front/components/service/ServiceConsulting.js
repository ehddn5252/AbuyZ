import React from "react";
import styled from "@emotion/styled";
export default function ServiceConsulting() {
  return (
    <div>
      <h1>1 : 1 문의하기</h1>
      <ColoredLine color="red" />
      <div style={{ padding: "2rem", display: "flex", flexDirection: "row" }}>
        <div style={{ flex: 1 }}>
          <span>카테고리</span>
        </div>
        <div style={{ flex: 3 }}></div>
      </div>
      <div style={{ padding: "2rem", display: "flex", flexDirection: "row" }}>
        <div style={{ flex: 1 }}>
          <span>문의 제목</span>
        </div>
        <div style={{ flex: 3 }}>
          <input
            placeholder="문의 제목을 입력해주세요."
            style={{ width: "80%" }}
          ></input>
        </div>
      </div>
      <div style={{ padding: "2rem", display: "flex", flexDirection: "row" }}>
        <div style={{ flex: 1 }}>
          <span>문의 내용</span>
        </div>
        <div style={{ flex: 3 }}>
          <input
            placeholder="문의 내용을 입력해주세요."
            style={{ width: "80%", height: 300 }}
          ></input>
        </div>
      </div>
      <div style={{ padding: "2rem", display: "flex", flexDirection: "row" }}>
        <div style={{ flex: 1 }}>
          <span>사진 첨부</span>
          <br></br>
          <span>(선택사항)</span>
        </div>
        <div style={{ flex: 3 }}>
          <input
            placeholder="문의 제목을 입력해주세요."
            style={{ width: "80%" }}
          ></input>
        </div>
      </div>
    </div>
  );
}
const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 5,
    }}
  />
);
