import { EuiFlexGroup, EuiFlexItem, EuiPanel } from '@elastic/eui';
import React, { Fragment, useContext } from 'react';
import { ChartContext } from '../context/ChartContext';
import HorizontalBarChart from '../../../components/Charts/HorizontalBarChart';
import StackedBarTimeSeriesChart from '../../../components/Charts/StackedBarTimeSeriesChart';
import PieChart from '../../../components/Charts/PieChart';
import TimeSeriesLineChart from '../../../components/Charts/TimeSeriesLineChart';
const ChartCharts = () => {
  const { entityChart, timeChart } = useContext(ChartContext);
  console.log(timeChart)
  return (
    <Fragment>

      <EuiFlexGroup direction='column'>
        <EuiFlexItem>
          <EuiFlexGroup>
            <EuiFlexItem grow={1}>
              <EuiFlexGroup direction="column">
                <EuiFlexItem>
                  <EuiPanel>

                    <HorizontalBarChart chartData={entityChart} />
                  </EuiPanel>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
            <EuiFlexItem grow={3}>
              <EuiFlexGroup direction="column">
                <EuiFlexItem>
                  <EuiPanel>
                    <StackedBarTimeSeriesChart chartData={timeChart} />
                  </EuiPanel>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFlexGroup>
            <EuiFlexItem grow={1}>
              <EuiFlexGroup direction="column">
                <EuiFlexItem>
                  <EuiPanel><PieChart chartData={entityChart} /></EuiPanel>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
            <EuiFlexItem grow={3}>
              <EuiFlexGroup direction="column">
                <EuiFlexItem>
                  <EuiPanel>
                    <TimeSeriesLineChart chartData={timeChart} />
                  </EuiPanel>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
      </EuiFlexGroup>

    </Fragment>
  );
}


export default ChartCharts;
