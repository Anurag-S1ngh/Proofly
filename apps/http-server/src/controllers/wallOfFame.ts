import { prisma } from "@workspace/database/client";
import "dotenv/config";
import { Request, Response } from "express";
import { createWallOfFameSchema } from "../zod-schema/wallOfFame";

export const getWallOfFame = async (req: Request, res: Response) => {
  const projectLinkId = req.params.id;
  if (!projectLinkId) {
    return;
  }
  try {
    const wallOfFame = await prisma.testimonial.findMany({
      where: {
        projectLinkId,
        inWallOfFame: true,
      },
      select: {
        id: true,
        description: true,
        type: true,
        stars: true,
        inWallOfFame: true,
        videoURL: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    res.json({
      msg: "wallofFame fetched",
      wallOfFame,
    });
  } catch (error) {
    console.log("error while fetching wall of fame: ", error);
    res.status(503).json({
      msg: "try again later",
    });
  }
  return;
};

export const addToWallOfFame = async (req: Request, res: Response) => {
  const testimonialId = req.params.id;
  if (!testimonialId) {
    return;
  }
  const isValidData = createWallOfFameSchema.safeParse(req.body);
  if (!isValidData.success) {
    res.status(422).json({
      msg: isValidData.error.issues[0]?.message,
    });
    return;
  }
  const { inWallOfFame } = isValidData.data;
  try {
    const test = await prisma.testimonial.update({
      where: {
        id: parseInt(testimonialId!),
      },
      data: {
        inWallOfFame: inWallOfFame,
      },
    });
    res.json({
      msg: "wall of fame updated",
      test,
    });
  } catch (error) {
    console.log("error while updating wall of fame: ", error);
    res.status(503).json({
      msg: "try again later",
    });
  }
  return;
};
