import "dotenv/config";
import express, { Router } from "express";
import { getDashboard } from "../controllers/dashboard";
import { Authentication } from "../middleware/auth";

export const dashboardRouter: Router = express.Router();

dashboardRouter.get("/dashboard/:linkId", Authentication, getDashboard);
