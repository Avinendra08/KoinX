import { asyncHandler } from "../utils/asyncHandler.js";
import { Crypto } from "../models/crypto.model.js";
import { ApiError } from "../utils/ApiError.js";
import axios from "axios";

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3/simple/price";
const Coins = ["bitcoin", "matic-network", "ethereum"];

// coins' ids, comma-separated if querying more than 1 coin.
// *refers to /coins/list.

const cryptoDataImportController = asyncHandler(async (req, res) => {
  const { data } = await axios.get(COINGECKO_API_URL, {
    params: {
      ids: Coins.join(","),
      vs_currencies: "usd",
      include_market_cap: "true",
      include_24hr_change: "true",
    },
  });

  const savedCoins = [];
  for (const coin of Coins) {
    const usd = data[coin].usd;
    const usd_market_cap = data[coin].usd_market_cap;
    const usd_24h_change = data[coin].usd_24h_change;

    const savedCoin = await Crypto.create({
      coin,
      usd,
      usd_market_cap,
      usd_24h_change,
    });

    savedCoins.push(savedCoin);
  }
  res.status(200).json({message:"coin added",savedCoins});
});

export { cryptoDataImportController };
