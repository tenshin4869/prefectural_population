import React, { useState } from "react";

type PrefecturesData = {
  prefCode: number;
  prefName: string;
};

type CheckBoxProps = {
  prefectures: PrefecturesData[];
  onChange: (prefCode: number) => void;
  selectedPrefCode: number | null;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  prefectures,
  onChange,
  selectedPrefCode,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      <div className="block sm:hidden mb-4">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="bg-blue-500 text-white tracking-wider w-full px-11 py-2 rounded hover:bg-blue-600"
        >
          都道府県を選択
        </button>
        {isDropdownOpen && (
          <div className="mt-2 border rounded bg-white shadow-lg max-h-64 overflow-y-auto">
            {prefectures.map((prefecture) => (
              <div
                key={prefecture.prefCode}
                className="px-4 py-2 border-b last:border-b-0"
              >
                <input
                  type="checkbox"
                  id={`dropdown-checkbox-${prefecture.prefCode}`}
                  name={prefecture.prefName}
                  checked={selectedPrefCode === prefecture.prefCode}
                  onChange={() => onChange(prefecture.prefCode)}
                />
                <label
                  htmlFor={`dropdown-checkbox-${prefecture.prefCode}`}
                  className="pl-2"
                >
                  {prefecture.prefName}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="hidden sm:flex sm:flex-wrap">
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
      </div>
    </>
  );
};

export default CheckBox;
