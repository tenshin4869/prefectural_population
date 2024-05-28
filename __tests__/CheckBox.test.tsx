import { render, screen, fireEvent } from "@testing-library/react";
import CheckBox from "../src/app/components/CheckBox";

describe("CheckBox Component", () => {
  const prefectures = [
    { prefCode: 1, prefName: "Hokkaido" },
    { prefCode: 2, prefName: "Aomori" },
  ];
  const onChangeMock = jest.fn();
  const selectedPrefCode = 1;

  test("should render prefectures with checkboxes", () => {
    render(
      <CheckBox
        prefectures={prefectures}
        onChange={onChangeMock}
        selectedPrefCode={selectedPrefCode}
      />
    );

    prefectures.forEach((pref) => {
      const labelElement = screen.getByText(pref.prefName);
      expect(labelElement).toBeInTheDocument();
      const checkbox = screen.getByLabelText(pref.prefName);
      expect(checkbox).toBeInTheDocument();
    });
  });

  test("should call onChange when checkbox is clicked", () => {
    render(
      <CheckBox
        prefectures={prefectures}
        onChange={onChangeMock}
        selectedPrefCode={null}
      />
    );
    const checkbox = screen.getByLabelText(prefectures[0].prefName);
    fireEvent.click(checkbox);
    expect(onChangeMock).toHaveBeenCalledWith(prefectures[0].prefCode);
  });
});
