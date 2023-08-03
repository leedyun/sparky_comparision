import React from "react";
import ApexCharts from "react-apexcharts";
import { Data } from "./Data";

export const Lang = ({ startDate, endDate }) => {
  const countLangs = {};
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

  filteredData.forEach((item) => {
    countLangs[item.Language] = (countLangs[item.Language] || 0) + 1;
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
  const totalLanguages = filteredData.length;
  const mostFrequentLanguage = Object.keys(countLangs).reduce((a, b) =>
    countLangs[a] > countLangs[b] ? a : b
  );
  const sortedLangs = Object.keys(countLangs).sort(
    (a, b) => countLangs[b] - countLangs[a]
  );
  const top5Langs = sortedLangs.slice(0, 5);

  const dataForTop5Langs = top5Langs.map((lang) => countLangs[lang]);
  const langLabels = top5Langs.map((lang) => lang);
  const mostFrequentLanguageCount = countLangs[mostFrequentLanguage];
  const mostFrequentLanguagePercentage = parseInt(
    (mostFrequentLanguageCount / totalLanguages) * 100
  );

  const colors = ["#5100CE", "#6E2FCE", "#936ECC", "#A996C8", "#C2BDCB"];
  const options = {
    series: dataForTop5Langs,
    chart: {
      type: "donut",
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "top",
    },
    colors: colors,
    labels: langLabels,
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
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "top",
          },
        },
      },
    ],
    stroke: {
      width: 0,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "80%",
          labels: {
            show: true,
            value: {
              fontSize: "14px",
              show: true,
              fontWeight: 700,
              textAlign: "center",
            },
            total: {
              showAlways: true,
              show: true,
              label: mostFrequentLanguagePercentage + "%",
              fontSize: "36px",
              fontWeight: 700,
              textAlign: "center",
              formatter: function () {
                return mostFrequentLanguage;
              },
            },
          },
        },
      },
    },
  };
  return (
    <div>
      <ApexCharts options={options} series={options.series} type="donut" />
    </div>
  );
};
