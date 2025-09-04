import { prisma } from "@workspace/database/client";
import bcrypt from "bcryptjs";
import "dotenv/config";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SignInSchema, SignUpSchema } from "../zod-schema/auth";

export const signup = async (req: Request, res: Response) => {
  const result = SignUpSchema.safeParse(req.body);
  if (!result.success) {
    res.status(422).json({
      msg: result.error.issues[0]?.message,
    });
    return;
  }
  const { firstName, lastName, email, password } = result.data;
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
  } catch (error: any) {
    if (error.code === "P2002") {
      res.status(400).json({
        msg: "Email already in use",
      });
    } else {
      console.error("error while sign up:", error);
      res.status(503).json({
        msg: "Try again later",
      });
    }
  }
  return;
};

export const signin = async (req: Request, res: Response) => {
  const result = SignInSchema.safeParse(req.body);
  if (!result.success) {
    res.status(422).json({
      msg: result.error.issues[0]?.message,
    });
    return;
  }
  const { email, password } = result.data;
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
      res.status(401).json({
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
};
