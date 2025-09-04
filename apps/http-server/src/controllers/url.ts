import "dotenv/config";
import { Request, Response } from "express";

import { createPresignedUrl } from "../generatePresignedURL";

export const getURL = async (_req: Request, res: Response) => {
  const id = Date.now();
  try {
    const url = await createPresignedUrl({
      region: "ap-south-1",
      bucket: "testimonials1829",
      key: `uploads/${id}.webm`,
    });
    res.json({
      msg: "url generated",
      url,
      id,
    });
  } catch (error) {
    console.log("error while generating url: ", error);
    res.status(503).json({ msg: "try again later" });
  }
};
