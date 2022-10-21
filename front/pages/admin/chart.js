// React
import React, { useState } from "react";

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

export default function Chart() {
  const [chartType, setChartType] = useState(0);

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
  return (
    <Container>
      <CategoryBox>
        <SmallChart onClick={LineChartClick} className="ChartTag">
          <ChartTitle>총 매출현황</ChartTitle>
          <LineChart />
        </SmallChart>
        <SmallChart onClick={BarChartClick} className="ChartTag">
          <ChartTitle>요일별 결제금액</ChartTitle>
          <BarChart />
        </SmallChart>
        <SmallChart onClick={DoughnutChartClick} className="ChartTag">
          <ChartTitle>카테고리별 판매비율</ChartTitle>
          <DoughnutChart />
        </SmallChart>
        <SmallChart>
          <ChartTitle>조회 기간 설정</ChartTitle>
          <Calendar />
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
            <LargeOnlyChart>
              {chartType === 0 ? <LineChart /> : null}
              {chartType === 1 ? <BarChart /> : null}
              {chartType === 2 ? <DoughnutChart /> : null}
              {chartType === 3 ? <DataChart /> : null}
              {chartType === 4 ? <StackChart /> : null}
            </LargeOnlyChart>
            <LargeChartExplantion>
              {chartType === 0 ? <LineData /> : null}
              {chartType === 1 ? <BarData /> : null}
              {chartType === 2 ? <DoughnutData /> : null}
              {chartType === 3 ? <DataChart /> : null}
              {chartType === 4 ? <StackData /> : null}
            </LargeChartExplantion>
          </LargeChartPage>
        </LargeChart>
        <SmallCategoryBox>
          <SmallChart2
            className="ChartTag"
            onClick={DataChartClick}
            style={{ marginBottom: "1rem" }}
          >
            <ChartTitle>상품별 결제금액</ChartTitle>
            <DataChart />
          </SmallChart2>
          <SmallChart2
            className="ChartTag"
            onClick={StackChartClick}
            style={{ marginTop: "1rem" }}
          >
            <ChartTitle>장바구니 상품비율</ChartTitle>
            <StackChart />
          </SmallChart2>
        </SmallCategoryBox>
      </CategoryBox2>
    </Container>
  );
}

const Container = styled.div`
  width: 85vw;
  height: 93vh;
  margin-left: 14.5rem;
  background-color: #fafafa;
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
  height: 100%;
`;

const LargeOnlyChart = styled.div`
  width: 70%;
`;
const LargeChartExplantion = styled.div`
  width: 30%;
  height: 100%;
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
`;

const ChartTitle = styled.div`
  margin: 0;
  padding: 0;
  padding-top: 0.5rem;
  padding-bottom: 1rem;
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
  font-weight: 1000;
`;
