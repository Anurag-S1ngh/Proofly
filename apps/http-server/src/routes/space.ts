import "dotenv/config";
import express, { Router } from "express";
import { createSpace, getSpace } from "../controllers/space";
import { Authentication } from "../middleware/auth";

export const spaceRouter: Router = express.Router();

spaceRouter.post("/", Authentication, createSpace);

spaceRouter.get("/:linkId", Authentication, getSpace);

spaceRouter.get("/all-spaces", Authentication);
