import React, { Component } from "react";

export default class Stats extends Component {
    render() {
        const { style, title, name, percentage, color } = this.props;
        return (
            <div class="euiPanel euiPanel--paddingMedium" style={style}>
                <div class="euiStat euiStat--leftAligned">
                    {/* <div class="euiText euiText--medium euiStat__description stat-head">
                        <p>{title}</p>
                    </div> */}
                    <div
                        class="euiTitle euiTitle--large euiStat__title flex mt-2"
                        style={{ color }}
                    >
                        <div className="stat-name">{name}</div>
                        <div className="ml-auto stat-percentage">{percentage}</div>
                    </div>
                </div>
            </div>
        );
    }
}