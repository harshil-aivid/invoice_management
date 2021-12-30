import { EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import React from "react";

import ChartPanel from "./containers/ChartPanel";
import ChartControlPanel from "./containers/ChartControlPanel";
import ChartProvider from "./context/ChartProvider";
import StatsPanel from "./containers/StatsPanel";

const ChartPage = () => {
  return (
    <ChartProvider>
      <EuiFlexGroup direction="column">
        <EuiFlexItem>
          <ChartControlPanel />
        </EuiFlexItem>
        <EuiFlexItem>
          <StatsPanel />
        </EuiFlexItem>
        <EuiFlexItem>
          <ChartPanel />
        </EuiFlexItem>


      </EuiFlexGroup>
    </ChartProvider>
  );
};

export default ChartPage;
