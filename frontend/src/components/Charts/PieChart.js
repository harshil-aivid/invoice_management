import { Chart, Partition, Settings } from '@elastic/charts';
import { EuiHorizontalRule, EuiTitle } from '@elastic/eui';
import { EUI_CHARTS_THEME_DARK, EUI_CHARTS_THEME_LIGHT } from '@elastic/eui/dist/eui_charts_theme';
import React, { Fragment } from 'react';
import { formatter } from '../../common/helper';

const PieChart = ({ chartData = [] }) => {
    return (
        <Fragment>
            <EuiTitle size="xxs">
                <h4>Quantity Bought Comparison</h4>
            </EuiTitle>
            <EuiHorizontalRule margin='xs' />
            <Chart size={{ height: 250 }}>
                <Settings showLegend={true}
                    legendPosition="bottom" />
                <Partition
                    data={chartData}
                    valueAccessor={d => Number(d.sumOfQuantity)}
                    valueFormatter={formatter.gallon}

                    layers={[
                        {
                            groupByRollup: d => d._id,
                            shape: {
                                fillColor: d => EUI_CHARTS_THEME_LIGHT.theme.colors.vizColors[d.sortIndex],
                            },
                        },
                    ]}
                    config={{
                        // ...euiPartitionConfig,
                        emptySizeRatio: 0.4,
                        clockwiseSectors: false,
                    }}
                />
            </Chart>
        </Fragment>
    );
};

export default PieChart;