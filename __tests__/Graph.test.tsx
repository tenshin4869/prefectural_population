import { render, screen } from "@testing-library/react";
import Graph from "../src/app/components/Graph";

describe("Graph Component", () => {
  const mockData = [
    { year: 2000, value: 100 },
    { year: 2010, value: 200 },
  ];
  const title = "人口";
  const prefectureName = "Tokyo";

  test("should render without crashing", () => {
    render(
      <Graph
        populationData={mockData}
        title={title}
        prefectureName={prefectureName}
      />
    );
    const titleElement = screen.getByText(`${title}推移`);
    expect(titleElement).toBeInTheDocument();
  });
});
