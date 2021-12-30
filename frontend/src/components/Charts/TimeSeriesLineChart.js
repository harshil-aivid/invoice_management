import React, { Fragment } from 'react';
import { Axis, BarSeries, Chart, LineSeries, niceTimeFormatByDay, Settings, timeFormatter } from '@elastic/charts';
import { dateFormatAliases, EuiHorizontalRule, EuiTitle, formatDate } from '@elastic/eui';
import { EUI_CHARTS_THEME_DARK, EUI_CHARTS_THEME_LIGHT } from '@elastic/eui/dist/eui_charts_theme';

const TimeSeriesLineChart = () => {
    return (<Fragment>
        <EuiTitle size="xxs">
            <h4>Price thoughout time</h4>
        </EuiTitle>
        <EuiHorizontalRule margin='xs' />
        <Chart size={{ height: 200 }}>
            <Settings
                // theme={EUI_CHARTS_THEME_LIGHT.theme}
                showLegend={true}
                legendPosition="top"
            />
            <LineSeries
                id="financial"
                name="Financial"
                data={[[0, 1], [1, 2]]}
                xScaleType="time"
                xAccessor={0}
                yAccessors={[1]}

            />
            <LineSeries
                id="tech"
                name="Tech support"
                data={[[0, 1], [1, 2]]}
                xScaleType="time"
                xAccessor={0}
                yAccessors={[1]}

            />
            <Axis
                title={formatDate(Date.now(), dateFormatAliases.date)}
                id="bottom-axis"
                position="bottom"
                tickFormat={timeFormatter(niceTimeFormatByDay(1))}
                showGridLines
            />
            <Axis
                id="left-axis"
                position="left"
                showGridLines
                tickFormat={(d) => Number(d).toFixed(2)}
            />
        </Chart>
    </Fragment>
    );
};

export default TimeSeriesLineChart;