import { asyncHandler } from "../utils/asyncHandler.js";
import { Crypto } from "../models/crypto.model.js";
import { ApiError } from "../utils/ApiError.js";
import axios from "axios";

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3/simple/price";
const Coins = ["bitcoin", "matic-network", "ethereum"];
const Coin = "matic-network";

const cryptoDataImportController = asyncHandler(async (req, res) => {
  const { data } = await axios.get(COINGECKO_API_URL, {
    params: {
      ids: Coin, // Fetch data only for Bitcoin
      vs_currencies: "usd",
      include_market_cap: "true",
      include_24hr_change: "true",
    },
  });
  console.log(data);
  
  res.send({ data});
});

export { cryptoDataImportController };
