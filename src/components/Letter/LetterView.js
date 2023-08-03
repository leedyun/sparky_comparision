import React, { useEffect, useState } from "react";
import { differenceInDays } from "date-fns";
import LetterStyle from "./LetterStyle";
import Data from "./Data";

const Letter = ({ startDate, endDate }) => {
  const [selectedDays, setSelectedDays] = useState(0);

  useEffect(() => {
    const days = getSelectedDays(startDate, endDate);
    setSelectedDays(days);
  }, [startDate, endDate]);

  const getSelectedDays = (start, end) => {
    if (end) {
      const days = differenceInDays(end, start) + 1;
      return days > 0 ? days : 0;
    }
    return 1;
  };

  return (
    <LetterStyle>
      공개된지 {selectedDays}일 부터 <span> {Data.people}명</span>이 참여했어요
    </LetterStyle>
  );
};

export default Letter;
