import { Request, Response } from "express";
import fs from "fs";
import csv from "csv-parser";
import { TradebookInterface, Tradebook } from "../models/tradebookModel";
//& Use below if you want info about single stock
// import yahooStockPrices from "yahoo-stock-prices";
import yahooFinance from "yahoo-finance";

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
    function (err, quotes) {
      console.log(`~ quotes`, quotes);
      result = quotes;
    }
  );

  res.send(result);
}

export async function postTradeBook(req: Request, res: Response) {
  const results = [];
  // console.log(req.file);
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
  console.log("I got here");
  console.log("req.body: ", req.body);
  const tradeInfo = req.body;
  console.log(`~ tradeInfo`, tradeInfo);
  const result = await Tradebook.create(tradeInfo);
  res.send(result);
}
