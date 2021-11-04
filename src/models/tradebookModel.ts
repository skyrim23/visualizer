import { model, Schema, Model, Document } from "mongoose";

export interface TradebookInterface extends Document {
  userId: string;
  tradebook: [
    {
      symbol: string;
      trades: [
        {
          tradeType: string;
          tradeDate: Date;
          quantity: number;
          price: number;
          tradeId: string;
        }
      ];
      averagePrice: number;
      totalQuantity: number;
      currentMarketPrice: number;
    }
  ];
}

const tradeSchema: Schema = new Schema({
  tradeId: {
    type: String,
    required: true,
    unique: true
  },
  tradeType: {
    type: String,
    required: true,
  },
  tradeDate: {
    type: Date,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  }
});

const symbolSchema: Schema = new Schema({
  symbol: {
    type: String,
    required: true,
    unique: true
  },
  trades: [tradeSchema],
  averagePrice: {
    type: Number,
    required: true
  },
  totalQuantity: {
    type: Number,
    required: true
  },
  currentMarketPrice: {
    type: Number,
    required: true
  }
});

const TradebookSchema: Schema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  tradebook: {
    type: Array,
    required: true,
    childSchemas: [symbolSchema]
  }
});

export const Tradebook: Model<any> = model("Tradebook", TradebookSchema);
