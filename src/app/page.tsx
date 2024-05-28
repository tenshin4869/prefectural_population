"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CheckBox from "./components/CheckBox";
import Graph from "./components/Graph";

type PrefecturesData = {
  prefCode: number;
  prefName: string;
};

type PopulationData = {
  year: number;
  value: number;
};

type PopulationType = "総人口" | "年少人口" | "生産年齢人口" | "老年人口";

export default function Home() {
  const [prefectures, setPrefectures] = useState<PrefecturesData[]>([]);
  const [populationData, setPopulationData] = useState<PopulationData[]>([]);
  const [selectedPrefCode, setSelectedPrefCode] = useState<number | null>(null);
  const [populationType, setPopulationType] =
    useState<PopulationType>("総人口");

  const populationTypes = ["総人口", "年少人口", "生産年齢人口", "老年人口"];

  // 都道府県データを取得
  useEffect(() => {
    axios
      .get("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
        headers: { "X-API-KEY": "7LjiidnATvOEygVKNk3lbYoHHDQ2PFRdlPhogABN" },
      })
      .then((res) => {
        setPrefectures(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // 選択された都道府県の人口データを取得
  useEffect(() => {
    if (selectedPrefCode !== null) {
      axios
        .get(
          `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${selectedPrefCode}`,
          {
            headers: {
              "X-API-KEY": "7LjiidnATvOEygVKNk3lbYoHHDQ2PFRdlPhogABN",
            },
          }
        )
        .then((res) => {
          const data = res.data.result.data;
          const selectedData =
            data.find((d: any) => d.label === populationType)?.data || [];
          setPopulationData(selectedData);
          console.log(selectedData);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setPopulationData([]);
    }
  }, [selectedPrefCode, populationType]);

  const handleCheckbox = (prefCode: number) => {
    if (selectedPrefCode === prefCode) {
      setSelectedPrefCode(null);
    } else {
      setSelectedPrefCode(prefCode);
    }
  };

  return (
    <div>
      <div className="flex justify-center bg-blue-300">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider py-3">
          都道府県人口推移
        </h1>
      </div>

      <div className="container mx-auto p-4">
        <div className="px-6 pt-10 ">
          <h2 className="text-xl border-l-8 border-blue-500">都道府県一覧</h2>
        </div>
        <div className="flex flex-wrap justify-center sm:justify-between  my-5 mx-10">
          <CheckBox
            prefectures={prefectures}
            onChange={handleCheckbox}
            selectedPrefCode={selectedPrefCode}
          />
        </div>
        <div className="px-6 p-10 ">
          <h2 className="text-xl border-l-8 border-blue-500">
            グラフ（下に表示されるよ！）
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row justify-center mb-4 space-x-2 ">
          {populationTypes.map((type) => (
            <button
              key={type}
              className={`mx-2 my-1 px-4 py-2 border ${
                populationType === type
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              } rounded`}
              onClick={() => setPopulationType(type as PopulationType)}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="w-full">
          {populationData.length > 0 && (
            <div className="w-full lg:w-3/4 mx-auto">
              <Graph populationData={populationData} title={populationType} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
