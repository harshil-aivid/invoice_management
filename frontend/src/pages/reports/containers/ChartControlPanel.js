import React, { useContext } from 'react';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiSuperSelect,
  EuiPanel,
} from "@elastic/eui";

import { ChartContext } from "../context/ChartContext";
import SuperDateTimePicker from "../../../components/SuperDateTimePicker/SuperDateTimePicker";
import ComboBox from "../../../components/ComboBox/ComboBox";

const ChartControlPanel = () => {
  const context = useContext(ChartContext);
  const { handleRangeUpdate,
    handleRefreshRateUpdate,
    timeSegmentOptions,
    selectedTimeSegment,
    handleTimeSegmentUpdate,

    storeOptions,
    selectedStores,
    handleStoresUpdate,
    groupByOptions,
    selectedGroupBy,
    handleGroupByUpdate,
    noOfLoadingInProgress = 0 } = context
  return (
    <EuiFlexItem>
      {" "}
      <EuiPanel>
        <EuiFlexGroup>
          {" "}
          <EuiFlexItem grow={false}>

            <SuperDateTimePicker
              style={{ maxWidth: 300 }}
              handleTimeUpdate={handleRangeUpdate}
              handleRefreshRateUpdate={handleRefreshRateUpdate}
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <ComboBox
              label="Stores"
              options={storeOptions}
              selectedOptions={selectedStores}
              onUpdate={handleStoresUpdate}
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFormRow label="Time by">
              <EuiSuperSelect
                options={timeSegmentOptions}
                valueOfSelected={selectedTimeSegment}
                onChange={handleTimeSegmentUpdate}

              />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFormRow label="Compare among">
              <EuiSuperSelect
                options={groupByOptions}
                valueOfSelected={selectedGroupBy}
                onChange={handleGroupByUpdate}

              />
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPanel>
    </EuiFlexItem>
  );
}

export default ChartControlPanel;
