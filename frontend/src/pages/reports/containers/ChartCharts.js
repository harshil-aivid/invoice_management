import { EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import React, { Fragment, useContext } from 'react';
import MultiBarComparisonChart from '../../../components/Charts/MultiBarComparisonChart';
import { ChartContext } from '../context/ChartContext';

const ChartCharts = () => {
    const context = useContext(ChartContext);
    return (
        <Fragment>
    <EuiFlexItem>
          <EuiFlexGroup>
            <EuiFlexItem grow={2}><MultiBarComparisonChart /></EuiFlexItem>
            <EuiFlexItem grow={1}></EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
        <EuiFlexItem></EuiFlexItem>            
        </Fragment>
    );
}


export default ChartCharts;
