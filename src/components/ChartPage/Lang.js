import React from "react";
import ApexCharts from "react-apexcharts";
import { Data } from "./Data";

export const Lang = () => {
  const countLangs = {};
  Data.forEach((item) => {
    countLangs[item.Language] = (countLangs[item.Language] || 0) + 1;
  });
  const totalLanguages = Data.length;
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
