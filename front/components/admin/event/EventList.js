import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";

// mui
import Grid2 from "@mui/material/Unstable_Grid2";
import EditEventModal from "./EditEventModal";

const event = [
  {
    title: "빼빼로 데이 이벤트",
    image: "event",
    content: "11월 빼빼로데이를 맞아 작은 이벤트를 준비했습니다!",
    startDate: "2022.10.18 16:00",
    endDate: "2022.11.11 12:00",
  },
  {
    title: "빼빼로 데이 이벤트",
    image: "빼빼로 사진",
    content: "11월 빼빼로데이를 맞아 작은 이벤트를 준비했습니다!",
    startDate: "2022.10.18 16:00",
    endDate: "2022.11.11 12:00",
  },
];

export default function SaleEventList() {
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
        {event.map((data, idx) => (
          <Grid2 xs={6} md={6} key={idx}>
            <EventItemBox>
              <Grid2 container spacing={3}>
                <Grid2
                  xs={12}
                  md={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Image
                    alt="인기 서비스"
                    src="/images/event.png"
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
                    <Title>{data.title}</Title>
                    <Content>{data.content}</Content>
                    <Content>
                      {data.startDate} ~ {data.endDate}
                    </Content>
                  </div>
                  <ButtonBox>
                    <DeleteButton>삭제</DeleteButton>
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

// const EventImg = styled.img`
//   object-fit: fill;
//   width: 100%;
//   height: 100%;
// `;

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
