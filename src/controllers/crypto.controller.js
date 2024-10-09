import { asyncHandler } from "../utils/asyncHandler.js";
import { Crypto } from "../models/crypto.model.js";
import { ApiError } from "../utils/ApiError.js";


const uploadCrypto = asyncHandler(async (req, res) => {
  //console.log("working");
  res.send({ status: 200, success: true, msg: "csv imported" });
});

export { uploadCrypto, getAssetBalance };
