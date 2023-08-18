import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, differenceInDays } from "date-fns";
import { ko } from "date-fns/esm/locale";
import {
  CalendarStyle,
  DateBox,
  Box,
  ButtonBox,
  Title,
  CalendarContainer,
  Arrow,
} from "./CalendarStyle";
import CustomPrevArrow from "./CustomPrevArrow";
import CustomNextArrow from "./CustomNextArrow";
import { initOnLoad } from "apexcharts";

const CustomHeader = ({ monthDate }) => {
  return (
    <div>
      <Title>
        {monthDate.getFullYear()}년 {monthDate.getMonth() + 1}월
      </Title>
    </div>
  );
};

const Calendar0 = ({ onDateRangeChange, isInitialLoad }) => {
  const publicationDate = new Date(2023, 4, 1);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarIndex, setCalendarIndex] = useState(1);
  const [monthsShown, setMonthsShown] = useState(3);

  const formatDate = (date) => {
    return format(date, "yyyy.MM.dd");
  };

  const [startDate, setStartDate] = useState(publicationDate);
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth <= 830) {
        setMonthsShown(1);
      } else if (window.innerWidth <= 1150) {
        setMonthsShown(2);
      } else {
        setMonthsShown(3);
      }
    };
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const handleMonthChange = (date) => {
    setCalendarIndex(date.getMonth());
  };

  const onChange = (dates) => {
    const [start, end] = dates;

    setStartDate(start);
    setEndDate(end);
    onDateRangeChange(start, end);
  };

  const handleCustomSelection = () => {
    setShowCalendar(!showCalendar);
  };

  const handleRecommendedPeriodClick = (days) => {
    const start = new Date(publicationDate);
    let end;

    if (days === -1 || days === 7) {
      end = new Date(start.getTime() + (days - 1) * 24 * 60 * 60 * 1000);
    } else {
      end = new Date(start.getTime() + days * 24 * 60 * 60 * 1000);
    }

    setStartDate(start);
    setEndDate(end);
    onDateRangeChange(start, end);
  };

  const handleApply = () => {
    setShowCalendar(false);
  };

  const handleCancel = () => {
    setStartDate(new Date());
    setEndDate(null);
    setShowCalendar(false);
    onDateRangeChange(new Date(), null);
  };

  const getDaysSincePublication = (endDate) => {
    const end = endDate || new Date();
    const days = differenceInDays(end, publicationDate);
    return days > -1 ? days : 0;
  };
  const getDaysSince = (startDate, endDate) => {
    const end = endDate || new Date();
    const days = differenceInDays(end, startDate) + 1;
    return days > 0 ? days : 0;
  };

  return (
    <CalendarStyle className="calendarStyle">
      <DateBox className="dateBox" onClick={handleCustomSelection}>
        <div className="date">
          {formatDate(startDate || publicationDate)}
          &nbsp;~&nbsp;{formatDate(endDate || startDate)}
          <img src="/downArrow.jpg" alt="img" className="img" />
        </div>
        <div className="past">
          {isInitialLoad
            ? "공개된 이후"
            : `공개된지 ${
                startDate > endDate ? 1 : getDaysSince(startDate, endDate)
              }일`}
        </div>
      </DateBox>
      {showCalendar && (
        <Box className="box" showCalendar={showCalendar}>
          <CalendarContainer className="calendarContainer">
            <DatePicker
              className="datePicker"
              dateFormat="yyyy-MM-dd"
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              monthsShown={monthsShown}
              locale={ko}
              selectsRange
              inline
              calendarClassName="date-picker-calendar"
              customInput={<div />}
              renderCustomHeader={({
                monthDate,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
                ...props
              }) => (
                <CustomHeader
                  className="customHeader"
                  monthDate={monthDate}
                  prevMonthButtonDisabled={prevMonthButtonDisabled}
                  nextMonthButtonDisabled={nextMonthButtonDisabled}
                  onDecreaseMonth={decreaseMonth}
                  onIncreaseMonth={increaseMonth}
                />
              )}
              onMonthChange={handleMonthChange}
            />
            <Arrow className="arrow">
              <CustomPrevArrow
                className="customPrevArrow"
                onClick={() => {
                  const prevMonth = new Date(startDate);
                  prevMonth.setMonth(prevMonth.getMonth() - 1);
                  onChange([prevMonth, endDate]);
                }}
              />
              <CustomNextArrow
                className="customNextArrow"
                onClick={() => {
                  const nextMonth = new Date(startDate);
                  nextMonth.setMonth(nextMonth.getMonth() + 1);
                  onChange([nextMonth, endDate]);
                }}
              />
            </Arrow>
          </CalendarContainer>
          <ButtonBox className="buttonBox">
            <span className="spanstyle">추천 기간</span>
            <button
              className="buttonstyle"
              onClick={() =>
                handleRecommendedPeriodClick(
                  getDaysSincePublication(new Date())
                )
              }
            >
              공개된 이후
            </button>
            <button
              className="buttonstyle"
              onClick={() => handleRecommendedPeriodClick(7)}
            >
              공개 초반 일주일
            </button>
            <button
              className="buttonstyle"
              onClick={() => handleRecommendedPeriodClick(0)}
            >
              공개 당일
            </button>
            <span className="spanstyle">사용자 설정</span>
            <div className="p">
              <p className="pstyle">{formatDate(startDate)}</p>
              <p className="center">&nbsp;-&nbsp;</p>
              <p className="pstyle">{formatDate(endDate || startDate)}</p>
            </div>
            <div className="check">
              <button className="cancel" onClick={handleCancel}>
                취소
              </button>
              <button className="ok" onClick={handleApply}>
                적용
              </button>
            </div>
          </ButtonBox>
        </Box>
      )}
    </CalendarStyle>
  );
};

export default Calendar0;
