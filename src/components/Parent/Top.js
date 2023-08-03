import { Container, Grid } from "@material-ui/core";
import { useState, useRef, useEffect } from "react";
import Calendar0 from "../Calendar/Calendar0";
import LetterView from "../Letter/LetterView";
import LetterPlay from "../Letter/LetterPlay";
import LetterReplay from "../Letter/LetterReplay";
import LetterTime from "../Letter/LetterTime";
import Nav from "../Nav/Nav";
import Chart from "../Chart/Chart";
import { Box } from "./Box";
import ChartPage from "../ChartPage/ChartPage";

const Top = ({ selectedMenu, onSelectMenu }) => {
  const publicationDate = new Date(2023, 4, 1);

  const [startDate, setStartDate] = useState(publicationDate);
  const [endDate, setEndDate] = useState(new Date());

  const handleDateRangeChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <div
            style={{
              borderBottom: "1px solid rgba(235, 239, 244, 1)",
              width: "100%",
            }}
          >
            <Nav onSelectMenu={onSelectMenu} />
          </div>
        </Grid>
        <Grid item xs={12}>
          <Calendar0
            startDates={startDate}
            endDates={endDate}
            onDateRangeChange={handleDateRangeChange}
          />
        </Grid>
      </Grid>
      <Grid item>
        {selectedMenu === "chart" ? (
          <ChartPage startDate={startDate} endDate={endDate} />
        ) : (
          <>
            {selectedMenu === "view" && (
              <LetterView startDate={startDate} endDate={endDate} />
            )}
            {selectedMenu === "play" && (
              <LetterPlay startDate={startDate} endDate={endDate} />
            )}
            {selectedMenu === "replay" && (
              <LetterReplay startDate={startDate} endDate={endDate} />
            )}
            {selectedMenu === "time" && (
              <LetterTime startDate={startDate} endDate={endDate} />
            )}
          </>
        )}
      </Grid>
      {selectedMenu !== "chart" && (
        <Box>
          <Grid item>
            <Chart startDate={startDate} endDate={endDate} />
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default Top;
