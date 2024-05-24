import React from "react";

type PrefecturesData = {
  prefCode: number;
  prefName: string;
};

type CheckBoxProps = {
  prefectures: PrefecturesData[];
  onChange: (prefCode: number) => void;
  selectedPrefCode: number | null;
};

// 都道府県一覧のチェックボックスを表示するコンポーネント
const CheckBox: React.FC<CheckBoxProps> = ({
  prefectures,
  onChange,
  selectedPrefCode,
}) => {
  return (
    <>
      {prefectures.map((prefecture) => (
        <div
          key={prefecture.prefCode}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 py-1"
        >
          <div className="border-solid border-2 rounded-full py-1 px-4">
            <input
              type="checkbox"
              id={`checkbox-${prefecture.prefCode}`}
              name={prefecture.prefName}
              checked={selectedPrefCode === prefecture.prefCode}
              onChange={() => onChange(prefecture.prefCode)}
            />
            <label
              htmlFor={`checkbox-${prefecture.prefCode}`}
              className="pl-0.5"
            >
              {prefecture.prefName}
            </label>
          </div>
        </div>
      ))}
    </>
  );
};

export default CheckBox;
