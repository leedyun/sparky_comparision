import React from "react";
import ApexChart from "react-apexcharts";
import { Data } from "./Data";
import "./Style.css";

const Age = ({ startDate, endDate }) => {
  const filteredData = Data.filter((item) => {
    const itemDate = new Date(item.Date);
    return itemDate >= startDate && itemDate <= endDate;
  });
  const ageRanges = ["17-", "18-24", "25-34", "35-44", "45-54", "55-64", "65+"];
  const countAge = ageRanges.reduce((countAgeObj, ageRange) => {
    countAgeObj[ageRange] = 0;
    return countAgeObj;
  }, {});

  Data.forEach((item) => {
    const age = item.Age;
    for (const ageRange of ageRanges) {
      if (ageRange === "17-" && age < 17) {
        countAge[ageRange]++;
      } else if (
        ageRange !== "17-" &&
        ageRange !== "65+" &&
        age >= parseInt(ageRange.split("-")[0]) &&
        age <= parseInt(ageRange.split("-")[1])
      ) {
        countAge[ageRange]++;
      } else if (ageRange === "65+" && age >= 65) {
        countAge[ageRange]++;
      }
    }
  });

  const sortedAgeRanges = ageRanges.sort((a, b) => countAge[b] - countAge[a]);
  const top5AgeRanges = sortedAgeRanges.slice(0, 5);
  const dataForTop5AgeRanges = top5AgeRanges.map(
    (ageRange) => countAge[ageRange]
  );

  const totalParticipants = Data.length;

  const toPercentage = (count) =>
    ((count / totalParticipants) * 100).toFixed(2);

  const percentages = dataForTop5AgeRanges.map((count) => toPercentage(count));
  const getDatesRange = () => {
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  const formatDate = (date) => {
    if (!date) {
      date = new Date();
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}.${month}.${day}`;
  };

  const colors = ["#5100CE", "#6E2FCE", "#936ECC", "#A996C8", "#C2BDCB"];

  const options = {
    series: [{ data: percentages }], // percentages 배열로 수정
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      x: { show: false },
      custom: ({ series, seriesIndex, dataPointIndex, w }) => {
        return (
          '<div style="display:flex; flex-direction:column; justify-content:center; align-items:center; width: 150px; height: 64px; border-radius: 3px; background: #FCFCFC; box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25); color: #090909; font-family: Poppins; font-size: 12px; line-height: normal; letter-spacing: 0.12px;">' +
          '<span style="font-weight: 400;">' +
          getDatesRange() +
          "</span>" +
          "<br />" +
          '<span style="font-weight: 700;">' +
          w.globals.labels[dataPointIndex] +
          "&nbsp&nbsp&nbsp" +
          series[seriesIndex][dataPointIndex] +
          "%" +
          "</span>" +
          "</div>"
        );
      },
    },
    colors: colors,
    grid: {
      show: true,
      borderColor: "#EBEFF4",
      position: "back",
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
        barHeight: "18px",
        distributed: true,
        columnWidth: 18,
      },
    },
    dataLabels: {
      enabled: false,
      style: {
        colors: colors,
      },
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: top5AgeRanges,
      labels: {},
    },
    yaxis: {
      labels: {
        formatter: (val) => `${val}%`,
      },
    },
  };

  return (
    <div>
      <ApexChart
        options={options}
        series={options.series}
        type="bar"
        height={300}
      />
    </div>
  );
};

export default Age;
