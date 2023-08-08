import { Container, Grid } from "@material-ui/core";
import Describe from "./Describe/Describe";
import Video from "./Video/Video";
import Top from "./Parent/Top";
import { useState } from "react";
import { SelectedVideosContext } from "./SelectedVideosContext";

const Dashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("chart");
  const [selectedVideos, setSelectedVideos] = useState([]);

  const handleSelectMenu = (menu) => {
    setSelectedMenu(menu);
  };
  return (
    <SelectedVideosContext.Provider
      value={{ selectedVideos, setSelectedVideos }}
    >
      <Container>
        <Grid item>
          <Top selectedMenu={selectedMenu} onSelectMenu={handleSelectMenu} />
        </Grid>
        {selectedMenu !== "chart" && (
          <>
            <Grid item>
              <Describe />
            </Grid>
            <Grid item>
              <Video />
            </Grid>
          </>
        )}
      </Container>
    </SelectedVideosContext.Provider>
  );
};

export default Dashboard;
