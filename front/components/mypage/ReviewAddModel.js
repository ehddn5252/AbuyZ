import React, { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";

// api
import { regisreview } from "../../pages/api/review";
export default function ReviewAddModel({
  productName,
  productOptions,
  setOpen,
  image,
  uid,
  productuid,
}) {
  const [file, setFile] = useState("");
  const [value, setValue] = React.useState(0);
  const regisrv = async (e) => {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("file", file[0]);

    const reviewDto = {
      product_uid: productuid,
      rating: value,
      content: content,
      order_uid: uid,
    };

    formdata.append("dto", reviewDto);

    const res = await regisreview(formdata);
  };
  const [content, setContent] = useState("");
  const closeModal = () => {
    setOpen(false);
  };
  return (
    <Container>
      <IconDiv>
        <CloseIcon onClick={closeModal} sx={{ cursor: "pointer" }} />
      </IconDiv>
      <ModalTitle style={{ fontWeight: "bold", fontSize: "2rem" }}>
        리뷰 작성
      </ModalTitle>
      <Box sx={{ display: "flex", marginTop: "3rem" }}>
        <ProductImg src={image}></ProductImg>
        <ProductInfo>
          <span style={{ fontWeight: "bold" }}>{productName}</span>
          {/* <span>{productOptions}</span> */}
        </ProductInfo>
        {/* <p>{product.productName}</p> */}
      </Box>
      <div style={{ marginTop: "4rem" }}>
        <span>별점등록 [{value}/5]</span>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              "& > legend": { mt: 2 },
            }}
          >
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </Box>
        </div>
      </div>
      <div style={{ marginTop: "4rem" }}>
        <span>리뷰 내용</span>
      </div>
      <AnswerDiv onChange={(event) => setContent(event)}></AnswerDiv>
      <div style={{ marginTop: "4rem" }}>
        <span>사진 첨부</span>
        <div style={{ flex: 10 }}>
          <input
            type="file"
            id="file"
            onChange={() => setFile(event.target.files[0])}
            multiple="multiple"
          />
        </div>
      </div>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Button variant="contained" sx={{ margin: "1rem" }} onClick={regisrv}>
          등록
        </Button>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  height: 50rem;
  border: 2px solid #000;
  background-color: #fff;
  box-shadow: 24;
  padding: 2rem;
`;

const ProductImg = styled.img`
  width: 4rem;
  height: 5rem;
`;
const AnswerDiv = styled.textarea`
  width: 100%;
  height: 10rem;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  margin-top: 1rem;
`;

const RateContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-top: 2rem;
`;

const IconDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const ModalTitle = styled.h1``;
