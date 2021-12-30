import React, { Fragment } from 'react';
import { Axis, BarSeries, Chart, LineSeries, niceTimeFormatByDay, Settings, timeFormatter } from '@elastic/charts';
import { dateFormatAliases, EuiHorizontalRule, EuiTitle, formatDate } from '@elastic/eui';
import { EUI_CHARTS_THEME_DARK, EUI_CHARTS_THEME_LIGHT } from '@elastic/eui/dist/eui_charts_theme';
import { formatter } from '../../common/helper';

const HorizontalBarChart = ({ chartData = [] }) => {
    const theme = EUI_CHARTS_THEME_LIGHT.theme;

    const customTheme = {
        // ...theme,
        barSeriesStyle: {
            displayValue: {
                ...theme.barSeriesStyle.displayValue,
                offsetX: 4,
                offsetY: 0,
                alignment: {
                    vertical: 'middle',
                },
            },
        },
    };

    return (<Fragment>
        <EuiTitle size="xxs">
            <h5>Invoices Amounts</h5>
        </EuiTitle>
        <EuiHorizontalRule margin='xs' />
        <Chart size={{ height: 250 }}>
            <Settings
                theme={customTheme}
                rotation={90}
                showLegend={false}

            />
            <BarSeries
                id="issues"
                name="Amount Spend"
                data={
                    chartData
                }
                xAccessor="_id"
                yAccessors={['sumOfTotalAmount']}
                tickFormat={formatter.dollar}
                displayValueSettings={{ showValueLabel: true }}
            />
            <Axis
                id="bottom-axis"
                position={"left"}
                labelFormat={(value) => formatter.truncate(value, 10)}
                showGridLines={false}
            />
            <Axis
                id="left-axis"
                position={"bottom"}
            />
        </Chart>
    </Fragment>)
}

export default HorizontalBarChart;
