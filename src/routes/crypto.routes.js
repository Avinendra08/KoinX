import express from "express";
import { cryptoDataImportController } from "../controllers/crypto.controller.js";

const router = express.Router();

router.get("/importData",cryptoDataImportController);

export default router;