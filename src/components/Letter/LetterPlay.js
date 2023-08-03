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
        <Box>
          공개된지 {selectedDays}일부터 <span>{Data.people}명</span>이
          플레이했어요
          <p className="p">플레이는 동영상으로 게임 플레이를 한 수예요.</p>
        </Box>
      </LetterStyle>
    </div>
  );
};

export default Letter;
