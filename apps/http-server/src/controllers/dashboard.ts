import { prisma } from "@workspace/database/client";
import "dotenv/config";
import { Request, Response } from "express";

export const getDashboard = async (req: Request, res: Response) => {
  const linkId = req.params.linkId;
  if (!linkId) {
    return;
  }
  try {
    const project = await prisma.project.findFirst({
      where: {
        linkId,
      },
      select: {
        linkId: true,
        projectName: true,
        testimonials: {
          select: {
            id: true,
            description: true,
            type: true,
            stars: true,
            sumbttedAt: true,
            inWallOfFame: true,
            videoURL: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });
    res.json({
      msg: "space fetched",
      space: project,
    });
  } catch (error) {
    console.log("error while fetching the projects: ", error);
    res.status(503).json({
      msg: "try again later",
    });
  }
};
