import React from "react";
import ApexCharts from "react-apexcharts";
import { Data } from "./Data";

export const Gender = ({ startDate, endDate }) => {
  const filteredData = Data.filter((item) => {
    if (startDate === null) {
      startDate = new Date(2023, 5, 1);
    }
    if (endDate === null) {
      endDate = new Date();
    }
    endDate.setHours(23, 59, 59, 999);
    const itemDate = new Date(item.Date);
    return itemDate >= startDate && itemDate <= endDate;
  });

  const countGender = {
    Male: 0,
    Female: 0,
  };
  filteredData.forEach((item) => {
    countGender[item.Gender] = (countGender[item.Gender] || 0) + 1;
  });
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

  const options = {
    series: Object.values(countGender),
    chart: {
      width: 380,
      type: "pie",
    },
    tooltip: {
      x: { show: false },
      custom: ({ series, seriesIndex, dataPointIndex, w }) => {
        const total = series.reduce((a, b) => a + b, 0);
        const percentage = ((series[seriesIndex] / total) * 100).toFixed(2);
        return (
          '<div style="display:flex; flex-direction:column; justify-content:center; align-items:center; width: 150px; height: 64px; border-radius: 3px; background: #FCFCFC; box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25); color: #090909; font-family: Poppins; font-size: 12px; line-height: normal; letter-spacing: 0.12px;">' +
          '<span style="font-weight: 400;">' +
          getDatesRange() +
          "</span>" +
          "<br />" +
          '<span style="font-weight: 700;">' +
          w.globals.labels[seriesIndex] +
          ": " +
          percentage +
          "%" +
          "</span>" +
          "</div>"
        );
      },
    },

    labels: Object.keys(countGender),
    legend: {
      position: "top",
    },
    stroke: {
      width: 0,
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#A996C8", "#5100CE"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  return (
    <div id="gender-chart">
      <ApexCharts
        options={options}
        series={options.series}
        type="pie"
        width={"100%"}
      />
    </div>
  );
};
