import mongoose, { Schema } from "mongoose";

const cryptoSchema = new Schema(
  {
    coin: {
      type: String,
      required: true,
    },
    usd: {
      type: Number,
      required: true,
    },
    usd_market_cap: {
      type: Number,
      required: true,
    },
    usd_24h_change: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Crypto = mongoose.model("Crypto", cryptoSchema);
