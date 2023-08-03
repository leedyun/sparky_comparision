import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { format, eachDayOfInterval } from "date-fns";
import "./Chart.css";

const Chart = ({ startDate, endDate }) => {
  const initialData = [
    [
      { date: new Date("2023-06-05"), value: 1 },
      { date: new Date("2023-07-09"), value: 2 },
      { date: new Date("2023-06-08"), value: 3 },
      { date: new Date("2023-07-10"), value: 2 },
    ],
    [
      { date: new Date("2023-07-26"), value: 1 },
      { date: new Date("2023-05-17"), value: 3 },
      { date: new Date("2023-06-06"), value: 1 },
      { date: new Date("2023-05-19"), value: 2 },
      { date: new Date("2023-06-18"), value: 3 },
      { date: new Date("2023-05-10"), value: 2 },
    ],
    [
      { date: new Date("2023-07-06"), value: 4 },
      { date: new Date("2023-06-17"), value: 2 },
      { date: new Date("2023-06-25"), value: 1 },
      { date: new Date("2023-07-06"), value: 2 },
      { date: new Date("2023-05-08"), value: 3 },
      { date: new Date("2023-05-10"), value: 2 },
    ],
  ];

  useEffect(() => {
    const mapDataByDate = (data) => {
      const map = {};
      data.forEach((item) => {
        const formattedDate = format(item.date, "yyyy.MM.dd");
        map[formattedDate] = item.value;
      });
      return map;
    };

    const generateChartData = (startDate, endDate, dataSeries) => {
      let formattedStartDate = startDate;
      let formattedEndDate = endDate;

      const dateRange = endDate
        ? eachDayOfInterval({
            start: formattedStartDate,
            end: formattedEndDate,
          })
        : [formattedStartDate];

      const chartSeries = dataSeries.map((data, index) => {
        const mappedData = mapDataByDate(data);

        const chartData = dateRange.map((date) => {
          const formattedDate = format(date, "yyyy.MM.dd");
          return mappedData[formattedDate] || 0;
        });

        return {
          name: `view ${index + 1}`,
          data: chartData,
        };
      });

      const categories = dateRange.map((date) => format(date, "yyyy.MM.dd"));

      return {
        series: chartSeries,
        categories: categories,
      };
    };

    let interval = 1;
    if (startDate && endDate) {
      const daysDifference = Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
      );
      if (daysDifference <= 5) {
        if (daysDifference >= 3) {
          interval = window.innerWidth <= 480 ? 3 : daysDifference;
        } else {
          interval = daysDifference;
        }
      } else {
        interval = window.innerWidth <= 480 ? 3 : 6;
      }
    }

    const newData = generateChartData(startDate, endDate, initialData);
    setChartData({ ...newData, interval: interval });
  }, [startDate, endDate]);

  const [chartData, setChartData] = useState(null);

  return (
    <div className="ChartContainer">
      {chartData && (
        <>
          <ReactApexChart
            options={{
              chart: {
                height: 300,
                type: "line",
                zoom: {
                  enabled: false,
                },
                toolbar: {
                  show: false,
                },
              },
              fill: {
                type: "solid",
              },
              legend: {
                show: false,
              },
              dataLabels: {
                enabled: false,
              },
              stroke: {
                curve: "straight",
              },
              grid: {
                row: {
                  colors: ["transparent"],
                  opacity: 1,
                },
              },
              colors: [
                "#5100CE",
                "rgba(250, 173, 20, 1)",
                "rgba(34, 131, 245, 1)",
              ],
              yaxis: {
                opposite: true,
                forceNiceScale: true,
              },
              xaxis: {
                type: "datetime",
                categories: chartData.categories,
                tickAmount: chartData.interval,
                labels: {
                  formatter: function (value, timestamp, index) {
                    const date = new Date(timestamp);
                    if (window.innerWidth <= 760) {
                      return format(date, "MM.dd");
                    } else {
                      return format(date, "yyyy.MM.dd");
                    }
                  },
                },
              },
              tooltip: {
                y: {
                  formatter: function (value) {
                    return `${value}`;
                  },
                },
                custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                  const date = chartData.categories[dataPointIndex];
                  const value = series[seriesIndex][dataPointIndex];
                  return (
                    '<div class="arrow_box">' +
                    "<span class='date'>" +
                    date +
                    "</span>" +
                    "<br> " +
                    "<span class='value'>" +
                    value +
                    "</span>" +
                    "</div>"
                  );
                },
                marker: {
                  show: false,
                },
              },
            }}
            series={chartData.series}
            type="line"
            height={215}
          />
        </>
      )}
    </div>
  );
};

export default Chart;
