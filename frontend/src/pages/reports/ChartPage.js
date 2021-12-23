import { EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import React from "react";
import ChartCharts from "./containers/ChartCharts";
import ChartControlPanel from "./containers/ChartControlPanel";
import ChartProvider from "./context/ChartProvider";

const ChartPage = () => {
  return (
    <ChartProvider>
      <EuiFlexGroup direction="column">
      <EuiFlexItem>

        <ChartControlPanel/>
      </EuiFlexItem>
    <EuiFlexItem><ChartCharts/></EuiFlexItem>
      </EuiFlexGroup>
    </ChartProvider>
  );
};

export default ChartPage;
