
import React, { useContext, useState } from 'react';

import {
    EuiStat,
    EuiFlexItem,
    EuiFlexGroup,
    EuiPanel,
    EuiIcon,
    EuiSwitch,
    EuiSpacer,
} from '@elastic/eui';
import Stats from '../../../components/Stats/Stats';
import { ChartContext } from '../context/ChartContext';
import { formatter } from '../../../common/helper';

export default () => {
    const { sumOfTotalAmount, sumOfQuantity, avgOfTotalAmount, avgOfQuantity, isStatLoading } = useContext(ChartContext);


    return (
        <div>
            <EuiFlexGroup>
                <EuiFlexItem>
                    <EuiPanel>
                        <EuiStat
                            title={formatter.dollar(sumOfTotalAmount)}
                            description="Total Amount"
                            textAlign="center"
                            isLoading={isStatLoading}
                        >

                        </EuiStat>
                    </EuiPanel>
                </EuiFlexItem>
                <EuiFlexItem>
                    <EuiPanel>
                        <EuiStat
                            title={formatter.gallon(sumOfQuantity)}
                            description="Total Galloons"
                            titleColor="accent"
                            textAlign="center"
                            isLoading={isStatLoading}
                        >
                            {/* <EuiIcon type="clock" color="accent" /> */}
                        </EuiStat>
                    </EuiPanel>
                </EuiFlexItem>
                <EuiFlexItem>
                    <EuiPanel>
                        <EuiStat
                            title={formatter.dollar(avgOfTotalAmount)}
                            description="Daily Average Amount"
                            titleColor="success"
                            textAlign="center"
                            isLoading={isStatLoading}
                        >
                            {/* <EuiIcon type="check" color="success" /> */}
                        </EuiStat>
                    </EuiPanel>
                </EuiFlexItem>
                <EuiFlexItem>
                    <EuiPanel>
                        <EuiStat
                            title={formatter.gallon(avgOfQuantity)}
                            description="Daily Average Galoons"
                            titleColor="danger"
                            textAlign="center"
                            isLoading={isStatLoading}
                        >
                            {/* <EuiIcon type="alert" color="danger" /> */}
                        </EuiStat>
                    </EuiPanel>

                </EuiFlexItem>
            </EuiFlexGroup>

        </div>
    );
};