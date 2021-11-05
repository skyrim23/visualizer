import { model, Schema, Model, Document } from "mongoose";

const SymbolSchema: Schema = new Schema({
  // _id: Schema.Types.ObjectId,
  symbol: {
    type: String, //TCS
    required: true,
  },
  trades: [{ type: Schema.Types.ObjectId, ref: "Trade" }], //6184c3ba00f50de18cc3d033
  averagePrice: {
    type: Number,
    required: true,
  },
  totalQuantity: {
    type: Number,
    required: true,
  },
  currentMarketPrice: {
    type: Number,
    required: true,
  },
});

export const Symbol: Model<any> = model("Symbol", SymbolSchema);
