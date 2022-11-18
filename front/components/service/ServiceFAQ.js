import React, { useEffect, useState } from "react";
import styled from "styled-components";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { getFAQ } from "../../pages/api/faq";
import ServiceFaqItem from "./ServiceFaqItem";
export default function ServiceFAQ() {
  const [faqList, setFaqList] = useState([]);
  const ffaq = async () => {
    const res = await getFAQ();
    setFaqList(res.data);
  };

  const [answerOpen, setAnswerOpen] = useState(false);
  const [selected, setSelected] = useState(-1);
  const clickhandle = (idx) => {
    if (selected === idx) {
      setSelected(-1);
    } else {
      setSelected(idx);
    }
  };
  useEffect(() => {
    ffaq();
  }, []);
  return (
    <Container>
      <MajorTitle>FAQ</MajorTitle>

      <hr
        style={{
          height: "0.3rem",
          background: "#7895B2",
          borderRadius: "1rem",
        }}
      />

      {faqList.map((e, idx) => (
        <div
          style={{ borderBottom: "1px solid rgba(128, 128, 128, 0.17)" }}
          key={idx}
        >
          <RowDiv key={idx} onClick={() => clickhandle(idx)}>
            <div style={{ flex: 11 }}>
              <span>{e.question}</span>
            </div>
            <div style={{ flex: 1 }}>
              <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
            </div>
          </RowDiv>
          {selected === idx ? (
            <SpanStyle>
              <span>{e.answer}</span>
            </SpanStyle>
          ) : null}
        </div>
      ))}
    </Container>
  );
}

const SpanStyle = styled.div`
  margin-top: 1rem;
  background-color: rgba(128, 128, 128, 0.17);
  border: none;
  padding: 3rem;
  border-radius: 5px;
  margin-bottom: 1rem;
`;

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  height: 3rem;
  align-items: center;
  &:hover span {
    color: #56a9f1;
    cursor: pointer;
  }
`;

const Container = styled.div`
  margin-top: 4.5rem;
  margin-bottom: 4rem;
  width: 56rem;
  min-height: 80vh;
`;

const MajorTitle = styled.span`
  font-size: 2rem;
`;
