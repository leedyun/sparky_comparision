import "./TimeStyle.css";
import { useRef } from "react";
import { format } from "date-fns";
import { Data } from "./Data";

const dayLabels = ["일", "월", "화", "수", "목", "금", "토"];
const hourLabels = [
  "12오전",
  "1오전",
  "2오전",
  "3오전",
  "4오전",
  "5오전",
  "6오전",
  "7오전",
  "8오전",
  "9오전",
  "10오전",
  "11오전",
  "12오후",
  "1오후",
  "2오후",
  "3오후",
  "4오후",
  "5오후",
  "6오후",
  "7오후",
  "8오후",
  "9오후",
  "10오후",
  "11오후",
];
const DAY_INDEXES = {
  0: "일",
  1: "월",
  2: "화",
  3: "수",
  4: "목",
  5: "금",
  6: "토",
};
function parseCustomDate(dateString) {
  const [datePart, timePart] = dateString.split(" ");
  const [year, month, day] = datePart.split("-");
  const [hour, minute] = timePart.split(":");
  const isoDateString = `${year}-${month}-${day} ${hour}:${minute}`;

  return isoDateString;
}
function formatDayAndHour(chartData) {
  const initialDates = {
    일: [],
    월: [],
    화: [],
    수: [],
    목: [],
    금: [],
    토: [],
  };
  const totalVisits = chartData.length;
  return [
    chartData.reduce((dates, dateString) => {
      const formattedDate = parseCustomDate(dateString);
      const date = new Date(formattedDate);
      const day = DAY_INDEXES[date.getDay()];
      const hour = format(date, "haaa")
        .replace("am", "오전")
        .replace("pm", "오후");

      (dates[day] = dates[day] || []).push(hour);

      return dates;
    }, initialDates),
    totalVisits,
  ];
}

const generateBackgroundColor = (count) => {
  if (count <= 0) {
    return "#C2BDCB";
  } else if (count <= 60) {
    return "#A996C8";
  } else if (count <= 120) {
    return "#936ECC";
  } else if (count <= 180) {
    return "#6E2FCE";
  } else {
    return "#5100CE";
  }
};

function generateLegend() {
  return (
    <div className="legend">
      <div className="box">
        <div className="color" style={{ background: "#C2BDCB" }} />
        <div className="color" style={{ background: "#A996C8" }} />
        <div className="color" style={{ background: "#936ECC" }} />
        <div className="color" style={{ background: "#6E2FCE" }} />
        <div className="color" style={{ background: "#5100CE" }} />
      </div>
      <div className="labels">
        <span className="label">0</span>
        <span className="label">60</span>
        <span className="label">120</span>
        <span className="label">180</span>
        <span className="label">240</span>
      </div>
    </div>
  );
}
const HeatMap = ({
  data = [],
  xAxisLabels = [],
  yAxisLabels = [],
  orientation = "vertical",
  startDate,
  endDate,
}) => {
  const minMaxCount = useRef([]);
  const [formattedData, totalVisits] = formatDayAndHour(data);
  const gridCells = xAxisLabels.reduce((days, dayLabel) => {
    const dayAndHour = yAxisLabels.reduce((hours, hourLabel) => {
      const count = formattedData[dayLabel]?.reduce((total, hour) => {
        return hour === hourLabel ? total + 1 : total;
      }, 0);
      const percentage = (count / totalVisits) * 100;
      minMaxCount.current = [...minMaxCount.current, percentage];

      return [
        ...hours,
        {
          dayHour: `${dayLabel} ${hourLabel}`,
          count,
        },
      ];
    }, []);

    return {
      ...days,
      [dayLabel]: {
        hours: dayAndHour,
      },
    };
  }, {});

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

  return (
    <div className="container">
      <div className={`heatmap ${orientation}`}>
        {Object.keys(gridCells).map((day) => (
          <div key={day} className="cells col">
            {gridCells[day].hours.map(({ dayHour, count }) => {
              const percentage = ((count / totalVisits) * 100).toFixed(2);
              return (
                <div
                  key={dayHour}
                  className="cell"
                  style={{ backgroundColor: generateBackgroundColor(count) }}
                >
                  <div className="tooltip" role="tooltip">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: 150,
                        height: 64,
                        borderRadius: 3,
                        background: "#FCFCFC",
                        boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
                        color: "#090909",
                        fontFamily: "Poppins",
                        fontSize: 12,
                        lineHeight: "normal",
                        letterSpacing: 0.12,
                      }}
                    >
                      <div>{getDatesRange()}</div>
                      <span style={{ fontWeight: 700 }}>
                        {dayHour} {percentage}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
            <span className="label">{day}</span>
          </div>
        ))}
        <div className="col">
          {yAxisLabels.map((label, index) => (
            <span key={label} className="label yAxisLabel">
              {index % 2 === 0 ? label : null}
            </span>
          ))}
        </div>
      </div>
      {generateLegend()}
    </div>
  );
};

export const Time = () => {
  const dateStrings = Data.map((item) => item.Date);
  return (
    <div className="container">
      <HeatMap
        orientation="vertical"
        data={dateStrings}
        xAxisLabels={dayLabels}
        yAxisLabels={hourLabels}
      />
    </div>
  );
};
