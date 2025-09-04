import "dotenv/config";
import express, { Router } from "express";
import { addToWallOfFame, getWallOfFame } from "../controllers/wallOfFame";
import { Authentication } from "../middleware/auth";

export const wallOfFameRouter: Router = express.Router();

wallOfFameRouter.get("/walloffame/:id", getWallOfFame);
wallOfFameRouter.post("/walloffame/:id", Authentication, addToWallOfFame);
