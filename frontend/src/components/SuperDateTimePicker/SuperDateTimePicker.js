import React, { Fragment } from "react";

import { EuiSuperDatePicker, EuiSpacer } from "@elastic/eui";
import dateMath from "@elastic/datemath";
export default class SuperDateTimePicker extends React.Component {
  state = {
    recentlyUsedRanges: [],
    start: "now-1d",
    end: "now",
    isLoading: false,
    isPaused: true,
    refreshInterval: undefined,
  };
  componentDidMount() {
    const { start, end } = this.state;
    const startTime = dateMath.parse(start);
    const endTime = dateMath.parse(end);
    this.props.handleTimeUpdate(startTime, endTime, start, end);
  }
  onTimeChange = ({ start, end }) => {
    const recentlyUsedRange = this.state.recentlyUsedRanges.filter(
      (recentlyUsedRange) => {
        const isDuplicate =
          recentlyUsedRange.start === start && recentlyUsedRange.end === end;
        return !isDuplicate;
      }
    );
    recentlyUsedRange.unshift({ start, end });
    this.setState({
      start,
      end,
      recentlyUsedRanges:
        recentlyUsedRange.length > 10
          ? recentlyUsedRange.slice(0, 9)
          : recentlyUsedRange,
      isLoading: false,
    });
    const startTime = dateMath.parse(start);
    const endTime = dateMath.parse(end);
    this.props.handleTimeUpdate(startTime, endTime, start, end);
    this.startLoading();
  };

  onRefresh = ({ start, end, refreshInterval }) => {
    return new Promise((resolve) => {
      setTimeout(resolve, 100);
    }).then(() => {});
  };

  startLoading = () => {
    setTimeout(this.stopLoading, 1000);
  };
  stopLoading = () => {
    this.setState({ isLoading: false });
  };

  onRefreshChange = ({ isPaused, refreshInterval }) => {
    this.setState(
      { isPaused, refreshInterval },
      this.props.handleRefreshRateUpdate(isPaused, refreshInterval)
    );
  };

  render() {
    const {
      isLoading,
      start,
      end,
      isPaused,
      refreshInterval,
      recentlyUsedRanges,
    } = this.state;
    return (
      <Fragment>
        <EuiSpacer />
        <EuiSuperDatePicker
          isLoading={isLoading}
          start={start}
          end={end}
          onTimeChange={this.onTimeChange}
          isPaused={isPaused}
          refreshInterval={refreshInterval}
          onRefreshChange={this.onRefreshChange}
          recentlyUsedRanges={recentlyUsedRanges}
          showUpdateButton={true}
        />
        <EuiSpacer />
      </Fragment>
    );
  }
}
