import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
// import Image from "next/image";

// API
import { delEvent } from "../../../pages/api/event";

// mui
import Grid2 from "@mui/material/Unstable_Grid2";
import EditEventModal from "./EditEventModal";

export default function SaleEventList(props) {
  // 이벤트 수정 모달
  const [edit, setEdit] = useState(false);

  // 이벤트 수정 모달
  const handleClickOpen = () => {
    setAdd(true);
  };

  return (
    <div>
      <Grid2
        container
        spacing={6}
        sx={{ padding: "3rem", margin: "0", width: "100%" }}
      >
        {props.eventArray.map((data) => (
          <Grid2 xs={6} md={6} key={data.uid}>
            <EventItemBox>
              <Grid2 container spacing={3}>
                <Grid2
                  xs={12}
                  md={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <img
                    alt="이미지 준비중"
                    src={data.thumbnail}
                    // layout="fill"
                    width={600}
                    height={200}
                  />
                </Grid2>
                <Grid2
                  xs={12}
                  md={12}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "1rem",
                    }}
                  >
                    <Title>{data.name}</Title>
                    <Content>{data.content}</Content>
                    <Content>
                      {moment(data.start_date).format().slice(0, 10)} ~{" "}
                      {moment(data.end_date).format().slice(0, 10)}
                    </Content>
                  </div>
                  <ButtonBox>
                    <DeleteButton
                      onClick={() => {
                        delEvent(data.uid), props.setDelNum(data.uid);
                      }}
                    >
                      삭제
                    </DeleteButton>
                    <EditButton onClick={() => setEdit(true)}>수정</EditButton>
                  </ButtonBox>
                  <EditEventModal edit={edit} setEdit={setEdit} />
                </Grid2>
              </Grid2>
            </EventItemBox>
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
}

const EventItemBox = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  background-color: #ecf0f4;
`;

const Title = styled.div`
  font-weight: 800;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  margin-left: 0;
`;

const Content = styled.div`
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 1rem;
`;

const DeleteButton = styled.button`
  background-color: #d1d1d1;
  color: black;
  border: none;
  height: 2rem;
  width: 3rem;
  font-size: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

const EditButton = styled.button`
  background-color: #57a9fb;
  color: white;
  border: 1px solid;
  margin-left: 1rem;
  height: 2rem;
  width: 5rem;
  font-size: 1rem;
  &:hover {
    cursor: pointer;
  }
`;
