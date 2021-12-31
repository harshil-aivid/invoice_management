import React, { Fragment } from 'react';
import { AreaSeries, Axis, BarSeries, Chart, CurveType, LineSeries, niceTimeFormatByDay, Settings, timeFormatter } from '@elastic/charts';
import { dateFormatAliases, EuiHorizontalRule, EuiTitle, formatDate } from '@elastic/eui';
import { EUI_CHARTS_THEME_DARK, EUI_CHARTS_THEME_LIGHT } from '@elastic/eui/dist/eui_charts_theme';
import { formatter } from '../../common/helper';

const TimeSeriesLineChart = ({ chartData = [] }) => {
    return (<Fragment>
        <EuiTitle size="xxs">
            <h4>Quantity Bought Time Trends</h4>
        </EuiTitle>
        <EuiHorizontalRule margin='xs' />
        <Chart size={{ height: 250 }}>
            <Settings
                // theme={EUI_CHARTS_THEME_LIGHT.theme}
                showLegend={true}
                legendPosition="top"
            />
            <AreaSeries
                id="financial"
                name="Financial"
                // xScaleType="time"

                yAccessors={[1]}
                data={
                    chartData
                }
                xAccessor="formattedAggsTime"
                yAccessors={['sumOfQuantity']}
                splitSeriesAccessors={['entity']}
                stackAccessors={['entity']}
                tickFormat={formatter.gallon}
                curve={CurveType.CURVE_MONOTONE_X}

            />

            <Axis
                title={formatDate(Date.now(), dateFormatAliases.date)}
                id="bottom-axis"
                position="bottom"
            // tickFormat={timeFormatter(niceTimeFormatByDay(1))}
            // showGridLines


            />
            <Axis
                id="left-axis"
                position="left"
                showGridLines
                // tickFormat={(d) => Number(d).toFixed(2)}
                tickFormat={formatter.gallon}
                ticks={5}
            />
        </Chart>
    </Fragment>
    );
};

export default TimeSeriesLineChart;