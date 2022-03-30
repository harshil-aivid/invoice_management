import React, { Component } from "react";
import moment from "moment";
import { ChartContext } from "./ChartContext";
import AxiosConfig from "../../../common/axiosConfig";
import { flatObject, percentage } from "../../../common/helper";
import { dayOfWeek, monthOfYear } from "../../../common/sense";


const keyToReadableFormat = (key, interval) => {
  switch (interval) {
    case "%w":
      return dayOfWeek[key - 1];
    case "%m":
      return monthOfYear[key - 1]
    default:
      return key;
  }
};

export default class ChartProvider extends Component {
  state = {
    startTime: moment().subtract(3, "y"),
    endTime: moment(),
    start: "now",
    end: "now",
    timeSegmentOptions: [
      { inputDisplay: "Day of week", value: "%w", formatAs: "Do MMM" },
      { inputDisplay: "Daily", value: "%d-%m-%Y", formatAs: "MMM Do YYYY" },
      { inputDisplay: "Monthly", value: "%m", formatAs: "MMM YYYY" },
      { inputDisplay: "Yearly", value: "%Y", formatAs: "YYYY" },
    ],
    selectedTimeSegment: "%w",
    groupByOptions: [
      { inputDisplay: "Gas Type", value: "listOfPurchases.gasTypeName" },
      { inputDisplay: "Store", value: "to" },
      { inputDisplay: "Company", value: "soldTo" },
    ],
    selectedGroupBy: "listOfPurchases.gasTypeName",
    companyOptions: [],
    storeOptions: [],
    selectedCompanies: [],
    selectedStores: [],
    noOfLoadingInProgress: 0,
    isStatLoading: true,
    timeChart: [],
    entityChart: []
  };

  componentDidMount = () => {
    this.fetchOptionsList()
    this.fetchData()
  }

  updateLoading(sign, from) {
    console.log("calling from : ", from, " sign : ", sign);
    if (sign === "+") {

      this.setState((prevState, { noOfLoadingInProgress }) => ({
        noOfLoadingInProgress: prevState.noOfLoadingInProgress + 1,
      }));
    } else if (sign === "-") {
      this.setState((prevState, { noOfLoadingInProgress }) => ({
        noOfLoadingInProgress: prevState.noOfLoadingInProgress - 1,
      }));
    }
  }

  fetchOptionsList = () => {
    AxiosConfig.post("/v1/invoice/get-filter-options-list")
      .then(({ data }) => {
        const storeOptions = data.storeOptions.map((value) => ({ value, label: value }))
        const companyOptions = data.companyOptions.map((value) => ({ value, label: value }))
        this.setState({ storeOptions, companyOptions, selectedStores: storeOptions }, () => this.fetchData())
      })
      .catch((e) => {
        console.log(e)
      });
  }

  fetchCharts = () => {
    const { selectedGroupBy, selectedTimeSegment, startTime, endTime, selectedStores } = this.state;
    const startISOString = startTime.utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    const endISOString = endTime.utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    const storeFilterList = selectedStores.map(({ value }) => value)
    AxiosConfig.post("/v1/invoice/get-time-chart-data", {
      timeFormat: selectedTimeSegment,
      entityField: selectedGroupBy,
      startISOString,
      endISOString,
      storeFilterList
    })
      .then(({ data }) => {

        const formattedTimeChart = data.map((obj) => { let updatedObj = flatObject(obj); updatedObj["formattedAggsTime"] = keyToReadableFormat(updatedObj["aggsTime"], selectedTimeSegment); return updatedObj }).sort(({ aggsTime: a }, { aggsTime: b }) => a - b)
        this.setState({ timeChart: formattedTimeChart })
      })
      .catch((e) => {
        console.log(e)
      });
    AxiosConfig.post("/v1/invoice/get-entity-chart-data", {
      entityField: selectedGroupBy,
      startISOString,
      endISOString,
      storeFilterList
    })
      .then(({ data }) => {
        this.setState({ entityChart: data.map((obj) => flatObject(obj)) })
      })
      .catch((e) => {
        console.log(e)
      });
  }

  fetchStats = () => {
    this.setState({ isStatLoading: true })
    const { startTime, endTime, selectedStores } = this.state;
    const storeFilterList = selectedStores.map(({ value }) => value)
    const startISOString = startTime.utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    const endISOString = endTime.utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    AxiosConfig.post("/v1/invoice/get-stats", {
      startISOString,
      endISOString,
      storeFilterList
    })
      .then(({ data: { days, sumOfQuantity, sumOfTotalAmount } }) => {
        this.setState({ sumOfQuantity, sumOfTotalAmount, avgOfTotalAmount: percentage(sumOfTotalAmount, days), avgOfQuantity: percentage(sumOfQuantity, days), isStatLoading: false })
      })
      .catch((e) => {
        this.setState({ isStatLoading: false })
        console.log(e)
      });
  }

  handleTimeSegmentUpdate = (selectedTimeSegment) => {
    this.setState({ selectedTimeSegment }, () => this.fetchData("timeBy"));
  };
  handleGroupByUpdate = (selectedGroupBy) => {
    this.setState({ selectedGroupBy }, () => this.fetchData("groupBy"));
  };

  handleRangeUpdate = (startTime, endTime, start, end) => {
    console.log(startTime, endTime, start, end)
    this.setState({ startTime, endTime, start, end }, () => this.fetchData());
  };
  handleRefreshRateUpdate = (isPaused, refreshRate) => {

    if (!isPaused) {
      // Now Playing
      this.autoFetchingInterval = setInterval(this.fetchData, refreshRate);
    } else {
      // now Stopped
      this.autoFetchingInterval && clearInterval(this.autoFetchingInterval);
    }
  };

  handleStoresUpdate = (selectedStores) => {
    this.setState({ selectedStores }, () => this.fetchData());
  };
  handleCompanyUpdate = (selectedCompanies) => {
    this.setState({ selectedCompanies });
  };

  fetchData = () => {

    this.fetchCharts()
    this.fetchStats()
  };

  render() {
    return (
      <ChartContext.Provider
        value={{
          ...this.state,
          handleTimeSegmentUpdate: this.handleTimeSegmentUpdate,
          handleGroupByUpdate: this.handleGroupByUpdate,
          handleRangeUpdate: this.handleRangeUpdate,
          handleRefreshRateUpdate: this.handleRefreshRateUpdate,
          handleStoresUpdate: this.handleStoresUpdate,
          handleCompanyUpdate: this.handleCompanyUpdate,
        }}
      >
        {this.props.children}
      </ChartContext.Provider>
    );
  }
}
