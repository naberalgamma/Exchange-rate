import React from "react";
import { ExchangeRate } from "../../slices/currencySlice";
import "./Currence.css";

export const Currence = ({
  currencyCodeA,
  currencyCodeB,
  date,
  rateBuy,
  rateSell,
}: ExchangeRate) => {
  if (currencyCodeA === 840) {
    currencyCodeA = "USD";
    currencyCodeB = "UAH";
  } else if (currencyCodeA === 978 && currencyCodeB === 980) {
    currencyCodeA = "EUR";
    currencyCodeB = "UAH";
  } else if (currencyCodeA === 978 && currencyCodeB === 840) {
    currencyCodeA = "EUR";
    currencyCodeB = "USD";
  }
  return (
    <div className="currence">
      <div className="currence_box">
        <h4>{currencyCodeA}</h4>
        <p>
          Current cource sell: {rateBuy} {currencyCodeB}
        </p>
        <p>
          Current cource buy: {rateSell} {currencyCodeB}
        </p>
      </div>
    </div>
  );
};
