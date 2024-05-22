"use client";
import React, { useEffect } from "react";
import axios from "axios";
export default function Home() {
  //都道府県データを取得
  useEffect(() => {
    axios
      .get("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
        headers: { "X-API-KEY": "7LjiidnATvOEygVKNk3lbYoHHDQ2PFRdlPhogABN" },
      })
      .then((res) => {
        console.log(res.data.result);
      });
  }, []);

  return <div>main</div>;
}
