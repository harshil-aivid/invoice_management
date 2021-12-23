import React, { Component } from "react";
import moment from "moment";
import { ChartContext } from "./ChartContext";
import AxiosConfig from "../../../common/axiosConfig";


const keyToReadableFormat = (key, interval) => {
  switch (interval) {
 
    case "1d":
      return moment(+key).format("MMM Do YYYY");
    case "1w":
      return `${moment(+key).format("Do MMM")} - ${moment(+key)
        .add(1, "w")
        .format("Do MMM")}`;
    case "1M":
      return moment(+key).format("MMM YYYY");
      case "1y":
      return moment(+key).format("YYYY");
  }
};

export default class ChartProvider extends Component {
  state = {
    startTime: moment().subtract(1, "d"),
    endTime: moment(),
    start: "now",
    end: "now",
    timeSegmentOptions: [
      { inputDisplay: "Days", value: "1d", formatAs: "MMM Do YYYY" },
      { inputDisplay: "Weeks", value: "1w", formatAs: "Do MMM" },
      { inputDisplay: "Months", value: "1M", formatAs: "MMM YYYY" },
    ],
    selectedTimeSegment: "1d",
    groupByOptions: [
      { inputDisplay: "Gas Type", value: "listOfCompliance.gasTypeName" },
      { inputDisplay: "Company", value: "soldTo" },
      { inputDisplay: "Store", value: "to" },
    ],
    selectedGroupBy: "soldTo",
    companyOptions: [],
    storeOptions: [],
    selectedCompanies: [],
    selectedStores: [],
   noOfLoadingInProgress: 0,
  };

  componentDidMount = ()=>{
    this.fetchOptionsList()
    this.fetchCharts()
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
 
  fetchOptionsList = ()=>{
    AxiosConfig.post("/v1/invoice/get-filter-options-list")
    .then(({ data }) => {
    const storeOptions = data.storeOptions.map((value)=>({value , label:value}))
    const companyOptions = data.companyOptions.map((value)=>({value , label:value}))
     this.setState({storeOptions,companyOptions})
    })
    .catch((e) => {
        console.log(e)
    });
  }

  fetchCharts = ()=>{
    AxiosConfig.post("/v1/invoice/get-chart-data")
    .then(({ data }) => {
    
    })
    .catch((e) => {
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
    this.setState({ selectedStores });
  };
  handleCompanyUpdate = (selectedCompanies) => {
    this.setState({ selectedCompanies });
  };
  
  fetchData = () => {
    console.log("FETCH BITCH")
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
