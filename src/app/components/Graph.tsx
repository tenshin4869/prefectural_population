import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

type PopulationData = {
  year: number;
  value: number;
};

type GraphProps = {
  populationData: PopulationData[];
  title: string;
};

const Graph: React.FC<GraphProps> = ({ populationData, title }) => {
  const options = {
    title: {
      text: `${title}推移`,
    },
    xAxis: {
      categories: populationData.map((data) => data.year),
    },
    yAxis: {
      title: {
        text: "人口数",
      },
    },
    series: [
      {
        name: title,
        data: populationData.map((data) => data.value),
        type: "line",
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Graph;
