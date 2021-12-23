import { Axis, BarSeries, Chart, Settings } from "@elastic/charts"
import React from "react"
import { EUI_CHARTS_THEME_DARK, EUI_CHARTS_THEME_LIGHT } from '@elastic/eui/dist/eui_charts_theme';

const MultiBarComparisonChart = ()=>{
    return <Chart size={{height: 400 , width :650}}>
    <Settings
    //   theme={theme}
    theme={EUI_CHARTS_THEME_LIGHT}
      rotation={0}
      showLegend={true}
      legendPosition="right"
    />
    <BarSeries
      id="issues"
      name="Issues"
      data={
        [{ vizType: "Data Table", count: 6, issueType: "Bug" },
        { vizType: "Data Table", count: 24, issueType: "Other" },
        { vizType: "Heatmap", count: 12, issueType: "Bug" },
        { vizType: "Heatmap", count: 20, issueType: "Other" }]
      }
      xAccessor="vizType"
      yAccessors={['count']}
      splitSeriesAccessors={['issueType']}
    />
    <Axis
      id="bottom-axis"
      position={"bottom"}
      showGridLines={false}
    />
    <Axis
      id="left-axis"
      position={"left"}
    />
  </Chart>
  
}

export default MultiBarComparisonChart;