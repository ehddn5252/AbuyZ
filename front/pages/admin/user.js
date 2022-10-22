// React
import React, { useState } from "react";

// MUI
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

// StyledComponents
import styled from "styled-components";

// 하위 Components
import ServiceCategory from "../../components/admin/user/ServiceCategory";
import ServiceList from "../../components/admin/user/ServiceList";
import ReviewCategory from "../../components/admin/user/ReviewCategory";
import ReviewList from "../../components/admin/user/ReviewList";
import ReportList from "../../components/admin/user/ReportList";

// 임시 탭 기능
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function User() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <h1> 유저관리 페이지</h1>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="secondary"
          TabIndicatorProps={{
            sx: {
              backgroundColor: "#967E76",
            },
          }}
          variant="fullWidth"
          style={{ color: "#967E76" }}
        >
          <Tab label="문의관리" {...a11yProps(0)} sx={{ fontSize: "1.5rem" }} />
          <Tab label="신고관리" {...a11yProps(1)} sx={{ fontSize: "1.5rem" }} />
          <Tab label="리뷰관리" {...a11yProps(2)} sx={{ fontSize: "1.5rem" }} />
        </Tabs>
      </Box>

      <Box>
        <TabPanel value={value} index={0}>
          <Box>
            <ServiceCategory />
            <ServiceList />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box>
            <ReportList />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Box>
            <ReviewCategory />
            <ReviewList />
          </Box>
        </TabPanel>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 13%;
  width: 80%;
  height: 100%;
`;
