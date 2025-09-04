import { prisma } from "@workspace/database/client";
import cors from "cors";
import "dotenv/config";
import express, { Response } from "express";
import { Authentication } from "./middleware/auth";
import { authRouter } from "./routes/auth";
import { dashboardRouter } from "./routes/dashboard";
import { spaceRouter } from "./routes/space";
import { urlRouter } from "./routes/url";
import { wallOfFameRouter } from "./routes/wallOfFame";
import { CustomExpressRequest } from "./util/util";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/space", spaceRouter);
app.use("/api/v1/walloffame", wallOfFameRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/url", urlRouter);

// to collect testimonials
app.post(
  "/:linkId",
  Authentication,
  async (req: CustomExpressRequest, res: Response) => {
    const linkId = req.params.linkId;
    const userId = req.userId;
    const { description, stars, id, type } = req.body;
    let videoURL;
    if (id) {
      videoURL = `${process.env.CLOUD_FRONT_URL}/${id}.webm`;
    }
    if (!linkId) {
      return;
    }
    if (!userId) {
      res.status(401).json({
        msg: "sign in first",
      });
      return;
    }
    try {
      await prisma.testimonial.create({
        data: {
          userId,
          videoURL,
          type,
          stars,
          projectLinkId: linkId,
          description,
        },
      });
      res.json({
        msg: "thank you for the review",
      });
    } catch (error) {
      console.log("error while submitting a review: ", error);
      res.status(503).json({
        msg: "try again later",
      });
    }
    return;
  },
);

app.listen(3001);
