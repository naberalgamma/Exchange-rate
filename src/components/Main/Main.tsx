import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchTodo } from "../../slices/currencySlice";
import { Currence } from "../Сurrency/Currence";
import "./Main.css";

export const Main = () => {
  const dispatch = useAppDispatch();
  const { list, error, loading } = useAppSelector((state) => state.exchange);
  const [input, setInput] = useState<any>();
  const [output, setOutput] = useState<number[]>([]);

  const EUR_IN = "EUR";
  const USD_IN = "USD";
  const UAH_IN = "UAH";
  const EUR_OUT = "EUR";
  const USD_OUT = "USD";
  const UAH_OUT = "UAH";
  const [optionsIn, setOptionsIn] = useState<number>(978);
  const [optionsOut, setOptionsOut] = useState<number>(978);

  const conversionMap: Record<string, number> = {
    "978/978": 1,
    "840/840": 1,
    "980/980": 1,
  };
  for (let i = 0; i < list.length; i++) {
    conversionMap[`${list[i].currencyCodeA}/${list[i].currencyCodeB}`] =
      list[i].rateBuy;
    conversionMap[`${list[i].currencyCodeB}/${list[i].currencyCodeA}`] =
      list[i].rateSell;
  }

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);
  const clear = () => {
    setInput("");
    setOutput([]);
  };
  const calculate = () => {
    optionsIn === 840 || optionsIn === 978
      ? setOutput((current) => [
          ...current,
          input * conversionMap[`${optionsIn}/${optionsOut}`],
        ])
      : setOutput((current) => [
          ...current,
          input / conversionMap[`${optionsIn}/${optionsOut}`],
        ]);
  };

  return (
    <div className="main_container">
      <div className="currence_all">
        {loading && <h1>Loading...</h1>}
        {error && <h2>Error {error}</h2>}
        {list.map((data) => (
          <Currence key={data.rateBuy} {...data} />
        ))}
      </div>
      <main className="main">
        <h3 className="buying_title">Selling/Buying</h3>
        <div className="main_control">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <select
            defaultValue={optionsIn}
            onChange={(e) => {
              setOptionsIn(+e.target.value);
            }}
          >
            <option value={978}>{EUR_IN}</option>
            <option value={840}>{USD_IN}</option>
            <option value={980}>{UAH_IN}</option>
          </select>
          <span>to</span>
          <select
            defaultValue={optionsOut}
            onChange={(e) => setOptionsOut(+e.target.value)}
          >
            <option value={978}>{EUR_OUT}</option>
            <option value={840}>{USD_OUT}</option>
            <option value={980}>{UAH_OUT}</option>
          </select>
          <input
            type="text"
            value={!!output.length ? output[output.length - 1] : ""}
          />
          <button onClick={calculate}>Сalculate</button>
          <button onClick={clear}>Clear</button>
        </div>
        <div className="main_results">
          <h3>Results:</h3>
          <ul>
            {output.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};
//befor refactor
// let ttt: number = 0;
// if (optionsIn === EUR_IN && optionsOut === EUR_OUT) {
//   ttt = input *= 1;
// } else if (optionsIn === EUR_IN && optionsOut === USD_OUT) {
//   ttt = input *= 0.965;
// } else if (optionsIn === EUR_IN && optionsOut === UAH_OUT) {
//   ttt = input *= 35.6;
// } else if (optionsIn === USD_IN && optionsOut === USD_OUT) {
//   setOutput((input *= 1));
// } else if (optionsIn === USD_IN && optionsOut === UAH_OUT) {
//   setOutput((input *= 36.65));
// } else if (optionsIn === USD_IN && optionsOut === EUR_OUT) {
//   setOutput((input *= 0.982));
// } else if (optionsIn === UAH_IN && optionsOut === UAH_OUT) {
//   setOutput((input *= 1));
// } else if (optionsIn === UAH_IN && optionsOut === USD_OUT) {
//   setOutput((input /= 36.65));
// } else if (optionsIn === UAH_IN && optionsOut === EUR_OUT) {
//   setOutput((input /= 35.6));
// }
