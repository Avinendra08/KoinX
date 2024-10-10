import express from "express";
import { getLatestCryptoStats } from "../controllers/crypto.controller.js";

const router = express.Router();

router.get("/getLatestCryptoStats",getLatestCryptoStats)

export default router;