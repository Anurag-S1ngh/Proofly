import { prisma } from "@workspace/database/client";
import bcrypt from "bcryptjs";
import cors from "cors";
import "dotenv/config";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Authentication } from "./middleware/auth";
import { SignInSchema, SignUpSchema } from "./zodSchema";
import { createPresignedUrl } from "./generatePresignedURL";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/signup", async (req: Request, res: Response) => {
  const isValidData = SignUpSchema.safeParse(req.body);
  if (!isValidData.success) {
    res.status(422).json({
      msg: "invalid data",
    });
    return;
  }
  const { firstName, lastName, email, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashPassword,
      },
    });
    res.json({
      msg: "sign up successful",
    });
  } catch (error) {
    console.log("error while sign up: ", error);
    res.status(503).json({
      msg: "try again later",
    });
  }
  return;
});

app.post("/signin", async (req: Request, res: Response) => {
  const isValidData = SignInSchema.safeParse(req.body);
  if (!isValidData.success) {
    res.status(422).json({
      msg: "invalid data",
    });
    return;
  }
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      res.status(401).json({
        msg: "sign up first",
      });
      return;
    }
    const isValidePassword = await bcrypt.compare(password, user.password);
    if (!isValidePassword) {
      res.json({
        msg: "invalid password",
      });
      return;
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
    res.json({
      msg: "sign in successful",
      token,
    });
  } catch (error) {
    console.log("error while sign in: ", error);
    res.status(503).json({
      msg: "try again later",
    });
  }
  return;
});

// ADD ZOD SCHEMA
app.post("/space", Authentication, async (req: Request, res: Response) => {
  const { testimonialTitle, testimonialDescription, question, projectName } =
    req.body;
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
});

app.post("/:linkId", Authentication, async (req: Request, res: Response) => {
  const linkId = req.params.linkId;
  const userId = req.userId;
  const { description, stars } = req.body;
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
});

app.get(
  "/space/:linkId",
  Authentication,
  async (req: Request, res: Response) => {
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
  },
);

app.get("/all-spaces", Authentication, async (req: Request, res: Response) => {
  const userId = req.userId;
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
});

app.get(
  "/dashboard/:linkId",
  Authentication,
  async (req: Request, res: Response) => {
    const linkId = req.params.linkId;
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
              stars: true,
              sumbttedAt: true,
              inWallOfFame: true,
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
  },
);

app.post("/walloffame/:id", async (req: Request, res: Response) => {
  const testimonialId = req.params.id;
  const inWallOfFame: boolean = req.body.inWallOfFame;
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
});

app.get("/url", (req, res) => {
  createPresignedUrl({
    region: "ap-south-1",
    bucket: "testimonials1829",
    key: "uploads/video.mp4",
  }).then((url) => {
    console.log("Presigned URL:", url);
  });
  res.json({
    msg: "",
  });
});

app.listen(3001);
