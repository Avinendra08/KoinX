import { asyncHandler } from "../utils/asyncHandler.js";
import { Cryptocoin } from "../models/crypto.model.js";
import { ApiError } from "../utils/ApiError.js";
import axios from "axios";
import cron from "node-cron";

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3/simple/price";
const Coins = ["bitcoin", "matic-network", "ethereum"];
// coins' ids, comma-separated if querying more than 1 coin.
// *refers to /coins/list.

//scheduling with the help of node-cron package
//Schedule cryptoDataImportController to run every 2 hours (* * * * * *)
cron.schedule("0 0 */2 * * *", async () => {
  try {
    console.log("Fetching latest cryptocurrency data...");
    await cryptoDataImportController();
  } catch (error) {
    console.error("Cron fetching failed", error.message);
  }
});

const cryptoDataImportController = async () => {
  try {
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
      try {
        const usd = data[coin]?.usd;
        const usd_market_cap = data[coin]?.usd_market_cap;
        const usd_24h_change = data[coin]?.usd_24h_change;

        if (
          usd === undefined ||
          usd_market_cap === undefined ||
          usd_24h_change === undefined
        ) {
          console.warn(`Data missing for ${coin}`);
          continue;
        }

        const savedCoin = await Cryptocoin.create({
          coin,
          usd,
          usd_market_cap,
          usd_24h_change,
        });

        savedCoins.push(savedCoin);
        console.log(`${coin} data saved successfully`);
      } catch (error) {
        console.error(`Failed to save data for ${coin}:`, error.message);
      }
    }
    return savedCoins;
  } catch (error) {
    console.error("Failed to fetch data from CoinGecko API:", error.message);
    throw new ApiError(500, "Error fetching data from CoinGecko");
  }
};

const getLatestCryptoStats = asyncHandler(async (req, res) => {
  const cryptoName = req.query.coin;
  if (!cryptoName || !Coins.includes(cryptoName)) {
    return res
      .status(400)
      .json({ error: "Please enter valid Crypto-coin name" });
  }

  const stats = await Cryptocoin.findOne({ coin: cryptoName }).sort({createdAt: -1,});

  if (!stats) {
    return res
      .status(404)
      .json({ error: "No data found for the requested coin" });
  }

  res.json({
    message:`Latest stats for ${cryptoName} are:`,
    price: stats.usd,
    marketCap: stats.usd_market_cap,
    "24hChange": stats.usd_24h_change,
  });
});

export { getLatestCryptoStats };
