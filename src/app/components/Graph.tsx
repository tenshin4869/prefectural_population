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
  prefectureName: string;
};

const Graph: React.FC<GraphProps> = ({
  populationData,
  title,
  prefectureName,
}) => {
  const options = {
    accessibility: {
      enabled: false,
    },
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
        name: prefectureName,
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
