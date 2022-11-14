import React, { useState, useEffect } from "react";
import styled from "styled-components";

// mui
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Grid2 from "@mui/material/Unstable_Grid2";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditProduct({ productInfo }) {
  // 모달
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <EditButton onClick={handleOpen}>수정하기</EditButton>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Grid2
            container
            spacing={1}
            sx={{ padding: "0", margin: "0", background: "#fff" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: "2rem",
              }}
            >
              <h2
                style={{
                  paddingLeft: "2rem",
                  margin: "0",
                  paddingTop: "2rem",
                  paddingBottom: "1rem",
                }}
              >
                상품 수정
              </h2>
              <CloseIcon
                onClick={handleClose}
                sx={{
                  cursor: "pointer",
                  marginRight: "2rem",
                  marginTop: "2rem",
                }}
              />
            </div>
            <Grid2
              xs={12}
              sx={{
                margin: "0",
                padding: "0",
                width: "100%",
              }}
            >
              <hr style={{ background: "#000", margin: "0", padding: "0" }} />
            </Grid2>
            {/* 카테고리 */}

            {/* 판매정보 */}
            {/* 마케팅 정보 */}
            {/* 상품 이미지 */}
            {/* 옵션 */}
          </Grid2>
        </Box>
      </Modal>
    </div>
  );
}

const Title = styled.p`
  font-size: xxx-large;
  font-weight: 1000;
  padding-top: 3rem;
  padding-bottom: 3rem;
  margin: 0;
`;

const EditButton = styled.button`
  background-color: #57a9fb;
  color: white;
  border: 1px solid;
  font-size: 1rem;
  padding: 0.5rem;
  &:hover {
    cursor: pointer;
  }
`;
