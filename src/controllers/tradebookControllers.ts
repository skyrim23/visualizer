import { Request, Response } from "express";
import fs from "fs";
import csv from "csv-parser";
import { Tradebook } from "../models/tradebookModel";
import { Trade } from "../models/tradeModels";


//& Use below if you want info about single stock
// import yahooStockPrices from "yahoo-stock-prices";
import yahooFinance from "yahoo-finance";
import { Error } from "mongoose";

export async function getTradeBook(req: Request, res: Response) {
  let result: any;
  //& This works for only a single symbol
  // const data = await yahooStockPrices.getCurrentData(['IBULHSGFIN.NS', 'AEGISCHEM.NS']);

  //& This works for multiple symbols
  await yahooFinance.quote(
    {
      symbols: ['IBULHSGFIN.NS', 'AEGISCHEM.NS'],
      modules: ["price"]
    },
    function (err: Error, quotes) {
      console.log(`~ quotes`, quotes);
      result = quotes;
    }
  );

  res.send(result);
}

export async function postTradeBook(req: Request, res: Response) {
  const results = [];
  fs.createReadStream(`uploads/${req.file.filename}`)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      console.log("results[0]: ", results[0]);
      console.log("---------------------------------------------");
    });
  res.send("tradebook post");
}

export async function addTrade(req: Request, res: Response) {
  const tradeInfo = req.body;
  console.log(`~ tradeInfo`, tradeInfo);
  const trade = {
    tradeId: tradeInfo.trade_id,
    tradeType: tradeInfo.trade_type,
    tradeDate: tradeInfo.trade_date,
    quantity: tradeInfo.quantity,
    price: tradeInfo.price,
  }
  console.log(`~ trade`, trade);
  const createTrade = await Trade.create(trade);
  console.log(`~ createTrade`, createTrade);

  // const result = await Tradebook.create(tradeInfo);
  res.send(createTrade);
}
// {
//   "symbol": "TCS",
//   "isin": "INE467B01029",
//   "trade_date": "2021-02-12",
//   "exchange": "NSE",
//   "segment": "EQ",
//   "series": "EQ",
//   "trade_type": "buy",
//   "quantity": "1.000000",
//   "price": "3193.900000",
//   "trade_id": "75021847",
//   "order_id": "1300000000214068",
//   "order_execution_time": "2021-02-12T09:15:02'
// }