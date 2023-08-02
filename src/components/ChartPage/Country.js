import React, { useEffect } from "react";
import ApexChart from "react-apexcharts";
import { Data } from "./Data";
import "./Style.css";

const Country = ({ startDate, endDate }) => {
  const filteredData = Data.filter((item) => {
    const itemDate = new Date(item.Date);
    return itemDate >= startDate && itemDate <= endDate;
  });
  const countCountries = {};
  filteredData.forEach((item) => {
    countCountries[item.Country] = (countCountries[item.Country] || 0) + 1;
  });

  const sortedCountries = Object.keys(countCountries).sort(
    (a, b) => countCountries[b] - countCountries[a]
  );

  const top5Countries = sortedCountries.slice(0, 5);

  const dataForTop5Countries = top5Countries.map(
    (country) => countCountries[country]
  );

  const totalParticipants = filteredData.length;

  const percentages = dataForTop5Countries.map((count) =>
    ((count / totalParticipants) * 100).toFixed(2)
  );
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
    series: [
      {
        name: "참여 수",
        data: percentages,
      },
    ],
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
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    responsive: [
      {
        breakpoint: 180,
        options: {
          chart: {
            background: "#5100CE",
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        barHeight: "18px",
        distributed: true,
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
      categories: top5Countries,
      labels: {
        formatter: (val) => `${val}%`,
      },
    },
  };

  return (
    <div style={{ display: "flex" }}>
      <ApexChart
        options={options}
        series={options.series}
        type="bar"
        height={300}
      />
    </div>
  );
};

export default Country;
