import React, { useMemo, useRef, useState } from "react";
import styled from "styled-components";

// mui
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid2 from "@mui/material/Unstable_Grid2";

export default function SaleProductImage() {
  const profileRef = useRef(null);
  const extraRef = useRef(null);

  // 대표 이미지
  const [profile, setProfile] = useState(null);

  // 추가 이미지
  const [imageFile, setImageFile] = useState([]);

  // 대표 이미지 등록
  const handleClickProfile = () => {
    profileRef.current?.click();
  };

  // 추가 이미지 등록
  const handleClickExtraImage = () => {
    extraRef.current?.click();
  };

  // 대표 이미지 등록 함수
  const uploadProfile = (e) => {
    const profileList = e.target.files;
    if (profileList && fileList[0]) {
      const url = URL.createObjectURL(profileList[0]);
      setProfile({
        file: profileList[0],
        thumbnail: url,
        type: profileList[0].type.slice(0, 5),
      });
    }
  };

  // 추가 이미지 등록 함수
  const uploadExtraImage = (e) => {
    const extraList = e.target.files;
    console.log(extraList);
    if (extraList && extraList[0]) {
      const subFile = [];
      // for (i = 0; i < extraList.length; i++) {
      //   const url = URL.createObjectURL(extraList[i]);
      //   subFile.push({
      //     file: extraList[i],
      //     thumbnail: url,
      //     type: extraList[i].type.slice(0, 5),
      //   });
      for (const idx in extraList) {
        // if (typeof idx === Number) {
        console.log(typeof idx);
        // }
      }
    }
    // setImageFile(subFile);
    // const url = URL.createObjectURL(extraList[0]);
    // console.log(url);
    // setImageFile({
    //   file: extraList[0],
    //   thumbnail: url,
    //   type: extraList[0].type.slice(0, 5),
    // });
  };

  // 대표 이미지 미리보기
  const showProfile = useMemo(() => {
    if (!profile && profile == null) {
      return;
    }
    return (
      <img
        src={profile.thumbnail}
        alt={profile.type}
        onClick={handleClickProfile}
        width="250px"
        height="300px"
      />
    );
  }, [profile]);

  // 추가 이미지 미리보기
  const showExtra = useMemo(() => {
    if (!imageFile && imageFile == null) {
      return;
    }
    return (
      <img
        src={imageFile.thumbnail}
        alt={imageFile.type}
        onClick={handleClickExtraImage}
        width="250px"
        height="300px"
      />
    );
  }, [imageFile]);

  return (
    <Grid2 sx={{ padding: "0", display: "flex" }}>
      <Grid2
        xs={2}
        sx={{
          padding: "0",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          background: "#DADADA",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
          fontWeight: "600",
        }}
      >
        상품 이미지
      </Grid2>
      <Grid2
        container
        xs={10}
        sx={{
          padding: "0",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          display: "flex",
          alignContent: "center",
        }}
      >
        {/* 대표 이미지 */}
        <ImageBox>
          <Title>대표이미지</Title>
          <Box
            component="span"
            sx={{ p: "5rem", border: "1px dashed grey", padding: "0" }}
          >
            {showProfile}
            <input
              type="file"
              accept="image/jpg, image/jpeg, image/png"
              ref={profileRef}
              onChange={uploadProfile}
              style={{ display: "none" }}
            />
            <Button sx={{ fontSize: "1.5rem" }} onClick={handleClickProfile}>
              Save
            </Button>
          </Box>
        </ImageBox>
        {/* 추가 이미지 */}
        <ImageBox>
          <Title>추가이미지</Title>
          <Box
            component="span"
            sx={{ p: "5rem", border: "1px dashed grey", padding: "0" }}
          >
            {showExtra}
            <input
              type="file"
              accept="image/jpg, image/jpeg, image/png"
              ref={extraRef}
              onChange={uploadExtraImage}
              style={{ display: "none" }}
              multiple
            />
            <Button sx={{ fontSize: "1.5rem" }} onClick={handleClickExtraImage}>
              Save
            </Button>
          </Box>
        </ImageBox>
        <ImageBox>
          <Title>상세설명</Title>
          <Box component="span" sx={{ p: "5rem", border: "1px dashed grey" }}>
            <Button sx={{ fontSize: "1.5rem" }}>Save</Button>
          </Box>
          <Description>권장 크기 : 600 x 1200</Description>
        </ImageBox>
      </Grid2>
    </Grid2>
  );
}

const ImageBox = styled.div`
  display: flex;
  padding-left: 3rem;
  margin-top: 3rem;
  margin-bottom: 3rem;
  align-items: flex-start;
  width: 100%;
`;

const Title = styled.p`
  font-size: 1.5rem;
  font-weight: 800;
  margin-top: 0;
  width: 10rem;
`;

const Description = styled.div`
  font-size: 0.9rem;
  padding-top: 0.5rem;
  padding-left: 0.8rem;
  color: gray;
`;
