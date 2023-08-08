import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { format, eachDayOfInterval } from "date-fns";
import "./Chart.css";

const Chart = ({ startDate, endDate, chdata }) => {
  const [initialData, setInitialData] = useState([
    [
      { date: new Date("2023-06-05"), value: 1 },
      { date: new Date("2023-07-09"), value: 2 },
      { date: new Date("2023-06-08"), value: 3 },
      { date: new Date("2023-07-10"), value: 2 },
    ],
  ]);

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    let dataToProcess = initialData;

    if (chdata && chdata.length > 0) {
      dataToProcess =
        chdata.length > 4
          ? [...initialData, [...chdata], chdata]
          : [...initialData, chdata];
    }

    const mapDataByDate = (dataSeries, startDate, endDate) => {
      const mappedData = {};
      dataSeries.forEach((series) => {
        series.forEach((item) => {
          const itemDate = new Date(item.date);
          if (itemDate >= startDate && itemDate <= endDate) {
            const formattedDate = format(itemDate, "yyyy.MM.dd");
            if (!mappedData[formattedDate]) {
              mappedData[formattedDate] = [];
            }
            mappedData[formattedDate].push(item.value);
          }
        });
      });
      return mappedData;
    };

    const generateChartData = (startDate, endDate, dataSeries = []) => {
      const mappedData = mapDataByDate(dataSeries, startDate, endDate);
      const dateRange = eachDayOfInterval({
        start: new Date(startDate),
        end: new Date(endDate),
      });

      const chartSeries = [];
      for (let i = 0; i < dataSeries.length; i++) {
        const data = dateRange.map((date) => {
          const formattedDate = format(date, "yyyy.MM.dd");
          return mappedData[formattedDate]
            ? mappedData[formattedDate][i] || 0
            : 0;
        });
        chartSeries.push({
          name: `view ${i + 1}`,
          data: data,
        });
      }

      const categories = dateRange.map((date) => format(date, "yyyy.MM.dd"));

      return {
        series: chartSeries,
        categories: categories,
      };
    };

    let interval = 1;
    if (startDate && endDate) {
      const daysDifference = Math.ceil(
        (new Date(endDate).getTime() - new Date(startDate).getTime()) /
          (1000 * 3600 * 24)
      );
      interval = Math.max(Math.min(Math.floor(daysDifference / 2), 6), 1);
    }

    const newData = generateChartData(startDate, endDate, dataToProcess);
    setChartData({ ...newData, interval: interval });
  }, [startDate, endDate, chdata, initialData]);

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
