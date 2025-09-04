import "dotenv/config";
import express, { Router } from "express";
import { signin, signup } from "../controllers/auth";

export const authRouter: Router = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
