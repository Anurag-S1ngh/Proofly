import { prisma } from "@workspace/database/client";
import "dotenv/config";
import { Response } from "express";
import { CustomExpressRequest } from "../util/util";
import { createSpaceSchema } from "../zod-schema/space";

export const createSpace = async (req: CustomExpressRequest, res: Response) => {
  const isValidData = createSpaceSchema.safeParse(req.body);
  if (!isValidData.success) {
    res.status(422).json({
      msg: isValidData.error.issues[0]?.message,
    });
    return;
  }
  const { testimonialTitle, testimonialDescription, question, projectName } =
    isValidData.data;
  const linkId = crypto.randomUUID();
  const userId = req.userId;
  if (!userId) {
    res.status(401).json({
      msg: "sign in first",
    });
    return;
  }
  try {
    await prisma.project.create({
      data: {
        testimonialDescription,
        testimonialTitle,
        question,
        projectName,
        linkId,
        userId,
      },
    });
    res.json({
      msg: "project created",
      linkId,
    });
  } catch (error) {
    console.log("error while creating project: ", error);
    res.json({
      msg: "try again later",
    });
  }
  return;
};

export const getSpace = async (req: CustomExpressRequest, res: Response) => {
  const linkId = req.params.linkId;
  const userId = req.userId;
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
    const project = await prisma.project.findFirst({
      where: {
        linkId,
      },
      select: {
        testimonialTitle: true,
        testimonialDescription: true,
        question: true,
      },
    });
    res.json({
      msg: "space fetched",
      space: project,
    });
  } catch (error) {
    console.log("error while submitting a review: ", error);
    res.status(503).json({
      msg: "try again later",
    });
  }
  return;
};

export const getAllSpaces = async (
  req: CustomExpressRequest,
  res: Response,
) => {
  const userId = req.userId;
  if (!userId) {
    res.status(401).json({
      msg: "sign in first",
    });
    return;
  }
  try {
    const projects = await prisma.project.findMany({
      where: {
        userId,
      },
      select: {
        linkId: true,
        projectName: true,
        _count: {
          select: {
            testimonials: true,
          },
        },
      },
    });
    res.json({
      msg: "all spaces fetched",
      spaces: projects,
    });
  } catch (error) {
    console.log("error while fetching the projects: ", error);
    res.status(503).json({
      msg: "try again later",
    });
  }
  return;
};
