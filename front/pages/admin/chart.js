// React
import React, { useState, useEffect } from "react";

// StyledComponent
import styled from "styled-components";

// 하위 Components
import LineChart from "../../components/admin/chart/LineChart";
import BarChart from "../../components/admin/chart/BarChart";
import DataChart from "../../components/admin/chart/DataChart";
import DoughnutChart from "../../components/admin/chart/DoughnutChart";
import StackChart from "../../components/admin/chart/StackChart";
import Calendar from "../../components/admin/chart/Calendar";
import LineData from "../../components/admin/chart/LineData";
import BarData from "../../components/admin/chart/BarData";
import DoughnutData from "../../components/admin/chart/DoughnutData";
import StackData from "../../components/admin/chart/StackData";

// API
import {
  getTotalsales,
  getCartStatistics,
  getDailyStatistics,
  getCategoryStatistics,
  getProductStatistics,
} from "../api/statistics";

export default function Chart() {
  const now = new Date();
  // 차트 타입
  const [chartType, setChartType] = useState(0);
  // 날짜
  const [startDate, setStartDate] = useState(
    new Date(now.setDate(now.getDate() - 30))
  );
  const [endDate, setEndDate] = useState(
    new Date(now.setDate(now.getDate() + 31))
  );

  const [day, setday] = useState(1);
  // 각 차트 데이터
  const [lineChartData, setLineChartData] = useState(null);
  const [barChartData, setBarChartData] = useState(null);
  const [doughnutChartData, setDoughnutChartData] = useState("");
  const [dataChartData, setDataChartData] = useState("");
  const [stackChartData, setStackhartData] = useState("");

  const LineChartClick = () => {
    setChartType(0);
  };
  const BarChartClick = () => {
    setChartType(1);
  };
  const DoughnutChartClick = () => {
    setChartType(2);
  };
  const DataChartClick = () => {
    setChartType(3);
  };
  const StackChartClick = () => {
    setChartType(4);
  };
  function getTime(date) {
    const data = date.toLocaleDateString();
    const data1 = data.replace(".", "-");
    const data2 = data1.replace(".", "-");
    const data3 = data2.replace(".", "");
    const data4 = data3.replaceAll(" ", "");
    return data4;
  }
  const loadData = async () => {
    const starttime = getTime(startDate);
    const endtime = getTime(endDate);
    const DateDto = {
      start_date: starttime,
      end_date: endtime,
    };
    const res1 = await getTotalsales(DateDto);
    const res2 = await getCartStatistics();
    const res3 = await getDailyStatistics(DateDto);
    const res4 = await getCategoryStatistics(DateDto);
    const res5 = await getProductStatistics(DateDto);
    setLineChartData(res1.data);
    setBarChartData(res3.data);
    setDoughnutChartData(res4.data);
    setDataChartData(res5.data);
    setStackhartData(res2.data);
  };
  useEffect(() => {
    loadData();
    const days =
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    setday(days);
  }, [startDate, endDate]);
  return lineChartData &&
    barChartData &&
    doughnutChartData &&
    stackChartData &&
    dataChartData ? (
    <Container>
      <CategoryBox>
        <SmallChart onClick={LineChartClick} className="ChartTag">
          <ChartTitle>총 매출현황</ChartTitle>
          <LineChart lineChartData={lineChartData.revenues} />
        </SmallChart>
        <SmallChart onClick={BarChartClick} className="ChartTag">
          <ChartTitle>요일별 결제금액</ChartTitle>
          {barChartData ? <BarChart barChartData={barChartData} /> : null}
        </SmallChart>
        <SmallChart onClick={DoughnutChartClick} className="ChartTag">
          <ChartTitle>카테고리별 판매비율</ChartTitle>
          <DoughnutChart doughnutChartData={doughnutChartData.big_category} />
        </SmallChart>
        <SmallChart>
          <ChartTitle>조회 기간 설정</ChartTitle>
          <Calendar
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            startDate={startDate}
            endDate={endDate}
          />
        </SmallChart>
      </CategoryBox>
      <CategoryBox2>
        <LargeChart>
          {/* 타이틀 */}
          {chartType === 0 ? <MajorTitle>총 매출현황</MajorTitle> : null}
          {chartType === 1 ? <MajorTitle>요일별 결제금액</MajorTitle> : null}
          {chartType === 2 ? (
            <MajorTitle>카테고리별 판매비율</MajorTitle>
          ) : null}
          {chartType === 3 ? <MajorTitle>상품별 결제금액</MajorTitle> : null}
          {chartType === 4 ? <MajorTitle>장바구니 상품비율</MajorTitle> : null}
          <LargeChartPage>
            {/* 차트 */}
            {chartType === 3 ? (
              <DataList>
                <DataChart dataChartData={dataChartData} />
              </DataList>
            ) : null}
            {chartType === 3 ? null : (
              <LargeOnlyChart>
                {chartType === 0 ? (
                  <LineChart lineChartData={lineChartData.revenues} />
                ) : null}
                {chartType === 1 ? (
                  <BarChart barChartData={barChartData} />
                ) : null}
                {chartType === 2 ? (
                  <DoughnutChart
                    doughnutChartData={doughnutChartData.big_category}
                  />
                ) : null}
                {chartType === 4 ? (
                  <StackChart stackChartData={stackChartData.big_categories} />
                ) : null}
              </LargeOnlyChart>
            )}
            {chartType === 3 ? null : (
              <LargeChartExplantion>
                {chartType === 0 ? (
                  <LineData lineChartData={lineChartData} day={day} />
                ) : null}
                {chartType === 1 ? (
                  <BarData barChartData={barChartData} />
                ) : null}
                {chartType === 2 ? (
                  <DoughnutData
                    doughnutChartData={doughnutChartData.big_category}
                  />
                ) : null}
                {chartType === 4 ? (
                  <StackData stackChartData={stackChartData.big_categories} />
                ) : null}
              </LargeChartExplantion>
            )}
          </LargeChartPage>
        </LargeChart>
        <SmallCategoryBox>
          <SmallChart2
            className="ChartTag"
            onClick={DataChartClick}
            style={{ marginBottom: "1rem" }}
          >
            <ChartTitle>상품별 결제금액</ChartTitle>
            <DataChart dataChartData={dataChartData} />
          </SmallChart2>
          <SmallChart2
            className="ChartTag"
            onClick={StackChartClick}
            style={{ marginTop: "1rem" }}
          >
            <ChartTitle>장바구니 상품비율</ChartTitle>
            <StackChart stackChartData={stackChartData.big_categories} />
          </SmallChart2>
        </SmallCategoryBox>
      </CategoryBox2>
    </Container>
  ) : null;
}

const Container = styled.div`
  background: #eeeeee;
  height: 87.5vh;
  padding-left: 15rem;
`;

const CategoryBox = styled.div`
  width: 100%;
  height: 33%;
  display: flex;
  justify-content: space-around;
  padding: 1rem;
`;
const CategoryBox2 = styled.div`
  width: 100%;
  height: 66%;
  display: flex;
  justify-content: space-around;
  padding: 1rem;
`;

const SmallCategoryBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  height: 100%;
  padding: 1rem;
`;

const LargeChart = styled.div`
  width: 74%;
  height: 94.5%;
  margin: 1rem;
  background-color: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const LargeChartPage = styled.div`
  display: flex;
  width: 100%;
  height: 95%;
`;

const LargeOnlyChart = styled.div`
  width: 70%;
  height: 100%;
`;
const LargeChartExplantion = styled.div`
  width: 30%;
  height: 100%;
`;

const DataList = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const SmallChart = styled.div`
  width: 25%;
  height: 100%;
  margin: 1rem;
  background-color: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const SmallChart2 = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  overflow: hidden;
`;

const ChartTitle = styled.div`
  margin: 0;
  padding: 0;
  padding-top: 0.5rem;
  padding-bottom: 0.3rem;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 1000;
`;

const MajorTitle = styled.p`
  margin: 0;
  padding: 0;
  padding-top: 0.5rem;
  padding-bottom: 1rem;
  text-align: center;
  font-size: 2.5rem;
  height: 10%;
  font-weight: 1000;
`;
