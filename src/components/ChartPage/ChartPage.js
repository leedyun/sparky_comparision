import React, { useEffect, useState } from "react";
import { Box, Container, Last } from "./Box";
import { Data } from "./Data";
import Country from "./Country";
import Age from "./Age";
import { Gender } from "./Gender";
import { Lang } from "./Lang";
import { Time } from "./Time";

const ChartPage = ({ startDate, endDate }) => {
  const countCountry = {};
  const countGender = {};
  const countLanguage = {};
  const countWeek = {};
  const countTime = {};

  Data.forEach((item) => {
    countCountry[item.Country] = (countCountry[item.Country] || 0) + 1;
    countGender[item.Gender] = (countGender[item.Gender] || 0) + 1;
    countLanguage[item.Language] = (countLanguage[item.Language] || 0) + 1;
    const dateObj = new Date(item.Date);
    const week = dateObj.getDay();
    const time = dateObj.getHours();
    countWeek[week] = (countWeek[week] || 0) + 1;
    countTime[time] = (countTime[time] || 0) + 1;
  });

  const mostFrequentCountry = Object.keys(countCountry).reduce((a, b) =>
    countCountry[a] > countCountry[b] ? a : b
  );
  const mostFrequentGender = Object.keys(countGender).reduce((a, b) =>
    countGender[a] > countGender[b] ? a : b
  );
  const KGender = mostFrequentGender === "male" ? "남성" : "여성";
  const mostFrequentLanguage = Object.keys(countLanguage).reduce((a, b) =>
    countLanguage[a] > countLanguage[b] ? a : b
  );

  const days = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const mostFrequentWeek =
    days[
      Object.keys(countWeek).reduce((a, b) =>
        countWeek[a] > countWeek[b] ? a : b
      )
    ];
  const mostFrequentTime =
    hours[
      Object.keys(countTime).reduce((a, b) =>
        countTime[a] > countTime[b] ? a : b
      )
    ];
  const period = mostFrequentTime < 12 ? "Am" : "PM";
  let hour = mostFrequentTime % 12;
  if (hour === 0) hour = 12;

  const ageData = Data.map((item) => item.Age);
  const ageRanges = [
    { name: "17-", range: [0, 17] },
    { name: "18-24", range: [18, 24] },
    { name: "25-34", range: [25, 34] },
    { name: "35-44", range: [35, 44] },
    { name: "45-54", range: [45, 54] },
    { name: "55-64", range: [55, 64] },
    { name: "65+", range: [65, Infinity] },
  ];
  const ageCounts = ageRanges.map((ageRange) =>
    ageData.reduce((count, age) => {
      if (age >= ageRange.range[0] && age <= ageRange.range[1]) {
        return count + 1;
      }
      return count;
    }, 0)
  );
  const mostFrequentAgeRangeIndex = ageCounts.reduce(
    (prevIndex, currentIndex, currentIndex2) =>
      currentIndex > ageCounts[prevIndex] ? currentIndex2 : prevIndex,
    0
  );
  const mostFrequentAgeRange = ageRanges[mostFrequentAgeRangeIndex].name;

  return (
    <div>
      <Container>
        <Box className="country">
          <div className="header">
            <div className="main">{mostFrequentCountry}</div>
            <div className="sub">가장 많이 참여한 국가</div>
          </div>
          <div
            style={{ height: "400px", display: "flex", alignItems: "center" }}
          >
            <Country startDate={startDate} endDate={endDate} />
          </div>
        </Box>
        <Box className="age">
          <div className="header">
            <div className="main">{mostFrequentAgeRange}</div>
            <div className="sub">가장 많이 참여한 연령</div>
          </div>
          <div
            style={{ height: "400px", display: "flex", alignItems: "center" }}
          >
            <Age startDate={startDate} endDate={endDate} />
          </div>
        </Box>
        <Box className="gender">
          <div className="header">
            <div className="main">{KGender}</div>
            <div className="sub">가장 많이 참여한 성별</div>
          </div>
          <div
            style={{ height: "400px", display: "flex", alignItems: "center" }}
          >
            <Gender startDate={startDate} endDate={endDate} />
          </div>
        </Box>
        <Box className="lang">
          <div className="header">
            <div className="main">{mostFrequentLanguage}</div>
            <div className="sub">가장 많이 참여한 언어</div>
          </div>
          <div
            style={{ height: "400px", display: "flex", alignItems: "center" }}
          >
            <Lang startDate={startDate} endDate={endDate} />
          </div>
        </Box>
        <Last className="time">
          <div className="component" style={{ display: "flex" }}>
            <div className="header">
              <div className="main">{mostFrequentWeek}</div>
              <div className="sub">가장 많이 참여한 요일</div>
            </div>
            <div className="header">
              <div className="main">{`${period} ${hour}`}</div>
              <div className="sub">가장 많이 참여한 시간</div>
            </div>
          </div>
          <div
            style={{ height: "400px", display: "flex", alignItems: "center" }}
          >
            <Time startDate={startDate} endDate={endDate} />
          </div>
        </Last>
      </Container>
    </div>
  );
};

export default ChartPage;
