import "dotenv/config";
import express, { Router } from "express";

import { Authentication } from "../middleware/auth";
import { getURL } from "../controllers/url";

export const urlRouter: Router = express.Router();

urlRouter.get("/", Authentication, getURL);
