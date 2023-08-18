import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { format, eachDayOfInterval } from "date-fns";
import "./Chart.css";

const Chart = ({ startDate, endDate, chdata1, chdata2 }) => {
  const [initialData, setInitialData] = useState([
    { date: new Date("2023-06-05"), value: 1 },
    { date: new Date("2023-07-09"), value: 2 },
    { date: new Date("2023-06-08"), value: 3 },
    { date: new Date("2023-07-10"), value: 2 },
  ]);

  const [chartDataInitial, setChartDataInitial] = useState(null);
  const [chartDataChdata1, setChartDataChdata1] = useState(null);
  const [chartDataChdata2, setChartDataChdata2] = useState(null);

  useEffect(() => {
    const mappedDataInitial = mapDataByDate(initialData, startDate, endDate);
    setChartDataInitial({
      series: generateDataArray(mappedDataInitial),
      categories: generateCategories(startDate, endDate),
    });

    if (chdata1) {
      const mappedDataChdata1 = mapDataByDate(chdata1, startDate, endDate);
      setChartDataChdata1({
        series: generateDataArray(mappedDataChdata1),
        categories: generateCategories(startDate, endDate),
      });
    } else {
      setChartDataChdata1(null);
    }

    if (chdata2) {
      const mappedDataChdata2 = mapDataByDate(chdata2, startDate, endDate);
      setChartDataChdata2({
        series: generateDataArray(mappedDataChdata2),
        categories: generateCategories(startDate, endDate),
      });
    } else {
      setChartDataChdata2(null);
    }
  }, [startDate, endDate, initialData, chdata1, chdata2]);

  const mapDataByDate = (dataSeries, startDate, endDate) => {
    return dataSeries.reduce((mappedSeries, item) => {
      const itemDate = new Date(item.date);
      if (itemDate >= startDate && itemDate <= endDate) {
        const formattedDate = format(itemDate, "yyyy.MM.dd");
        if (!mappedSeries[formattedDate]) {
          mappedSeries[formattedDate] = 0;
        }
        mappedSeries[formattedDate] += item.value;
      }
      return mappedSeries;
    }, {});
  };

  const generateDataArray = (mappedData) => {
    return generateCategories(startDate, endDate).map(
      (date) => mappedData[date] || 0
    );
  };

  const generateCategories = (startDate, endDate) => {
    if (startDate > endDate) {
      [startDate, endDate] = [endDate, startDate];
    }
    const dateRange = eachDayOfInterval({
      start: new Date(startDate),
      end: new Date(endDate),
    });
    return dateRange.map((date) => format(date, "yyyy.MM.dd"));
  };

  const generateSeries = () => {
    let seriesArray = [
      {
        name: "Initial Data",
        data: chartDataInitial.series,
      },
    ];

    if (chartDataChdata1) {
      seriesArray.push({
        name: "Chdata 1",
        data: chartDataChdata1.series,
      });
    }

    if (chartDataChdata2) {
      seriesArray.push({
        name: "Chdata 2",
        data: chartDataChdata2.series,
      });
    }

    return seriesArray;
  };

  return (
    <div className="ChartContainer">
      <div className="Chart">
        {chartDataInitial && (
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
                categories: chartDataInitial.categories,
                tickAmount: chartDataInitial.interval,
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
                  const date = chartDataInitial.categories[dataPointIndex];
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
            series={generateSeries()}
            type="line"
            height={215}
          />
        )}
      </div>
    </div>
  );
};

export default Chart;
