import { Axis, BarSeries, Chart, LineSeries, niceTimeFormatByDay, Settings, timeFormatter } from '@elastic/charts';
import { dateFormatAliases, EuiHorizontalRule, EuiTitle, formatDate } from '@elastic/eui';
import React, { Fragment } from 'react';
import { EUI_CHARTS_THEME_DARK, EUI_CHARTS_THEME_LIGHT } from '@elastic/eui/dist/eui_charts_theme';
import { formatter } from '../../common/helper';
const StackedBarTimeSeriesChart = ({ chartData = [] }) => {
    const theme = EUI_CHARTS_THEME_LIGHT
    return (<Fragment>
        <EuiTitle size="xxs">
            <h4>Time Trends for Gas Purchases</h4>
        </EuiTitle>
        <EuiHorizontalRule margin='xs' /><Chart size={{ height: 300 }}>
            <Settings
                theme={theme}
                rotation={0}
                showLegend={true}
                legendPosition="top"
            />
            <BarSeries
                id="issues"
                name="Issues"
                data={
                    chartData
                }
                xAccessor="formattedAggsTime"
                yAccessors={['sumOfTotalAmount']}
                splitSeriesAccessors={['entity']}
                stackAccessors={['entity']}
                tickFormat={formatter.dollar}
            />
            <Axis
                id="bottom-axis"
                position={"bottom"}
                showGridLines={false}
            />
            <Axis
                id="left-axis"
                position={"left"}
            />
        </Chart>
    </Fragment>)

}

export default StackedBarTimeSeriesChart;
