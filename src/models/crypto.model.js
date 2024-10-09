import mongoose, { Schema } from "mongoose";

const cryptoSchema = new Schema(
  {
    coinName: {
      type: String,
      required: true,
    },
    currentPrice: {
      type: Number,
      required: true,
    },
    marketCap: {
      type: Number,
      required: true,
    },
    changeIn24Hour: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Crypto = mongoose.model("Crypto", cryptoSchema);
