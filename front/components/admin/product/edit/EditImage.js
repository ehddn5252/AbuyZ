import React, { useRef, useState } from "react";
import styled from "styled-components";

// mui
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid2 from "@mui/material/Unstable_Grid2";

export default function EditImage(props) {
  const profileRef = useRef(null);
  const extraRef = useRef(null);
  const detailRef = useRef(null);

  // 대표 이미지 정보
  const [profile, setProfile] = useState(props.mainImg);

  // 추가 이미지 정보
  const [imageFile, setImageFile] = useState(props.extraImg);

  // 상세 이미지 정보
  const [detail, setDetail] = useState(props.descImg);

  // 대표 이미지 등록
  const handleClickProfile = () => {
    profileRef.current?.click();
  };

  // 추가 이미지 등록
  const handleClickExtraImage = () => {
    extraRef.current?.click();
  };

  // 상세 이미지 등록
  const handleClickDetailImage = () => {
    detailRef.current?.click();
  };

  // 추가 이미지 미리보기
  const [subImageFile, setSubImageFile] = useState(null);

  // 대표 이미지 등록 함수
  const uploadProfile = (e) => {
    const profileList = e.target.files[0];
    props.setMainImg(profileList);
    if (profileList) {
      const url = URL.createObjectURL(profileList);
      setProfile({
        file: profileList,
        thumbnail: url,
        type: profileList.type.slice(0, 5),
      });
    }
  };

  // 추가 이미지 등록 함수
  const uploadExtraImage = (e) => {
    const extraList = e.target.files;
    const target = Object.values(extraList);
    if (target.length < 3) {
      props.setExtraImg(target);
      if (target !== []) {
        const a = [];
        for (let i = 0; i < target.length; i++) {
          const subUrl = URL.createObjectURL(target[i]);
          a.push({
            file: target[i],
            thumbnail: subUrl,
            type: target[i].type.slice(0, 5),
          });
        }
        setSubImageFile(a);
        setImageFile(target);
      }
    } else {
      alert("최대 2개까지 등록 가능합니다.");
    }
  };

  // 상세 이미지 등록 함수
  const uploadDetail = (e) => {
    const profileList = e.target.files[0];
    props.setDescImg(profileList);
    if (profileList) {
      const url = URL.createObjectURL(profileList);
      setDetail({
        file: profileList,
        thumbnail: url,
        type: profileList.type.slice(0, 5),
      });
    }
  };

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
          {profile === null ? (
            <Box
              component="span"
              sx={{
                p: "2rem",
                border: "1px dashed grey",
                marginLeft: "1rem",
              }}
            >
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
          ) : profile.thumbnail ? (
            <div style={{ display: "flex" }}>
              <img
                src={profile.thumbnail}
                alt={profile.type}
                onClick={handleClickProfile}
                width="140px"
                height="120px"
              />
              <Box
                component="span"
                sx={{
                  p: "2rem",
                  border: "1px dashed grey",
                  marginLeft: "1rem",
                }}
              >
                <input
                  type="file"
                  accept="image/jpg, image/jpeg, image/png"
                  ref={profileRef}
                  onChange={uploadProfile}
                  style={{ display: "none" }}
                />
                <Button
                  sx={{ fontSize: "1.5rem" }}
                  onClick={handleClickProfile}
                >
                  Save
                </Button>
              </Box>
            </div>
          ) : (
            <div style={{ display: "flex" }}>
              <img
                src={profile}
                alt={profile}
                onClick={handleClickProfile}
                width="140px"
                height="120px"
              />
              <Box
                component="span"
                sx={{
                  p: "2rem",
                  border: "1px dashed grey",
                  marginLeft: "1rem",
                }}
              >
                <input
                  type="file"
                  accept="image/jpg, image/jpeg, image/png"
                  ref={profileRef}
                  onChange={uploadProfile}
                  style={{ display: "none" }}
                />
                <Button
                  sx={{ fontSize: "1.5rem" }}
                  onClick={handleClickProfile}
                >
                  Save
                </Button>
              </Box>
            </div>
          )}
        </ImageBox>
        {/* 추가 이미지 */}
        <ImageBox>
          <Title>추가이미지</Title>
          <Grid2 container spacing={2} sx={{ padding: "0", margin: "0" }}>
            {subImageFile
              ? subImageFile.map((e, idx) => (
                  <Grid2 key={idx}>
                    <img
                      src={e.thumbnail}
                      alt={e.type}
                      onClick={handleClickExtraImage}
                      width="140px"
                      height="120px"
                      style={{ marginRight: "1rem" }}
                    />
                  </Grid2>
                ))
              : imageFile.map((e, idx) => (
                  <Grid2 key={idx}>
                    <img
                      src={e.imgUrl}
                      alt={e.imgUrl}
                      onClick={handleClickExtraImage}
                      width="140px"
                      height="120px"
                      style={{ marginRight: "1rem" }}
                    />
                  </Grid2>
                ))}
            <Box
              component="span"
              sx={{
                p: "2rem",
                border: "1px dashed grey",
              }}
            >
              <input
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                ref={extraRef}
                onChange={uploadExtraImage}
                style={{ display: "none" }}
                multiple
              />
              <Button
                sx={{ fontSize: "1.5rem" }}
                onClick={handleClickExtraImage}
              >
                Save
              </Button>
            </Box>
          </Grid2>
        </ImageBox>
        {/* 상세 이미지 */}
        <ImageBox>
          <Title>상세 이미지</Title>
          {detail === null ? (
            <Box
              component="span"
              sx={{
                p: "2rem",
                border: "1px dashed grey",
              }}
            >
              <input
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                ref={detailRef}
                onChange={uploadDetail}
                style={{ display: "none" }}
              />
              <Button
                sx={{ fontSize: "1.5rem" }}
                onClick={handleClickDetailImage}
              >
                Save
              </Button>
            </Box>
          ) : detail.thumbnail ? (
            <div style={{ display: "flex" }}>
              <img
                src={detail.thumbnail}
                alt={detail.type}
                onClick={handleClickDetailImage}
                width="140px"
                height="120px"
              />
              <Box
                component="span"
                sx={{
                  p: "2rem",
                  border: "1px dashed grey",
                  marginLeft: "1rem",
                }}
              >
                <input
                  type="file"
                  accept="image/jpg, image/jpeg, image/png"
                  ref={detailRef}
                  onChange={uploadDetail}
                  style={{ display: "none" }}
                />
                <Button
                  sx={{ fontSize: "1.5rem" }}
                  onClick={handleClickDetailImage}
                >
                  Save
                </Button>
              </Box>
            </div>
          ) : (
            <div style={{ display: "flex" }}>
              <img
                src={detail}
                alt={detail}
                onClick={handleClickProfile}
                width="140px"
                height="120px"
              />
              <Box
                component="span"
                sx={{
                  p: "2rem",
                  border: "1px dashed grey",
                  marginLeft: "1rem",
                }}
              >
                <input
                  type="file"
                  accept="image/jpg, image/jpeg, image/png"
                  ref={detailRef}
                  onChange={uploadDetail}
                  style={{ display: "none" }}
                />
                <Button
                  sx={{ fontSize: "1.5rem" }}
                  onClick={handleClickDetailImage}
                >
                  Save
                </Button>
              </Box>
            </div>
          )}
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
