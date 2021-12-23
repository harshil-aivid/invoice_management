import { EuiComboBox, EuiFormRow } from "@elastic/eui";

import React, { Component } from "react";

export default class ComboBox extends Component {
  state = {
    error: undefined,
    inputRef: undefined,
    selectedOptions: [],
    options: this.props.options,
  };
  onChange = (selectedOptions) => {
    var curOptions = selectedOptions;
    if (selectedOptions.findIndex(({ label }) => label === "All") !== -1) {
      var allOptions = this.props.options;
      allOptions.filter(({ label }) => label === "All");
      curOptions = allOptions;
    }
    this.setState({ selectedOptions: curOptions, error: undefined });
    this.props.onUpdate(curOptions);
  };

  onSearchChange = (value, hasMatchingOptions) => {
    const error =
      value.length === 0 || hasMatchingOptions
        ? undefined
        : `"${value}" is not a valid option`;
    this.setState({
      error: error,
    });
  };

  onBlur = () => {
    const { inputRef, selectedOptions } = this.state;
    const { label } = this.props;
    if (inputRef) {
      const { value } = inputRef;
      const error =
        value.length === 0
          ? this.props.isRequired && selectedOptions.length === 0
            ? `${label} : ${
                "SOME ERROR"
              }`
            : undefined
          : `"${value}" is not a valid option`;
      this.setState({
        error: error,
      });
      this.props.onUpdate(selectedOptions, error);
    }
  };
  setInputRef = (newRef) => {
    this.setState({ inputRef: newRef });
  };
  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.selectedOptions !== this.state.selectedOptions) {
      this.setState({ selectedOptions: nextProps.selectedOptions });
    }
  }
  render() {
    const { label, options, errors } = this.props;
    const { selectedOptions, error } = this.state;
    const allSelected = selectedOptions.length === options.length;
    if (errors) {
      this.onBlur();
    }
    // var addAllOptions = options;
    // addAllOptions.push({ label: "All", value: "ALL" });
    return (
      <div>
        <EuiFormRow error={error} isInvalid={error !== undefined} label={label}>
          <EuiComboBox
            placeholder="Select one or more options"
            options={[
              ...options,
              ...(allSelected ? [] : [{ label: "All", value: "All" }]),
            ]}
            selectedOptions={selectedOptions}
            inputRef={this.setInputRef}
            onChange={this.onChange}
            onSearchChange={this.onSearchChange}
            onBlur={this.onBlur}
          />
        </EuiFormRow>
      </div>
    );
  }
}
