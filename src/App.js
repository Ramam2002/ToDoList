import React from "react";
import { Grommet, Box } from "grommet";
import Main from "./components/table/Main";

function App() {
  return (
    <Grommet full>
      <Box margin="xlarge" border>
        <Main/>
      </Box>
    </Grommet>
  );
}

export default App;
