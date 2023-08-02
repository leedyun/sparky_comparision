import { Container, Grid } from "@material-ui/core";
import Describe from "./Describe/Describe";
import Video from "./Video/Video";
import Top from "./Parent/Top";
import { useState } from "react";

const Dashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("chart");

  const handleSelectMenu = (menu) => {
    setSelectedMenu(menu);
  };
  return (
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
  );
};

export default Dashboard;
