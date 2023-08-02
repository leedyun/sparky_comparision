import React, { useEffect, useState } from "react";
import { differenceInDays } from "date-fns";
import LetterStyle, { Box } from "./LetterStyle";
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
    <div>
      <LetterStyle>
        지난 {selectedDays}일 동안 <span>{Data.Time}분</span> 플레이됐어요
      </LetterStyle>
      <LetterStyle style={{ marginTop: 20 }}>
        <Box>
          최대 <span>{Data.Time}분</span> 플레이한 사람이 있어요
          <p className="p">최대 리플레이어의 플레이 시간을 계산한 값이에요.</p>
        </Box>
      </LetterStyle>
    </div>
  );
};

export default Letter;
