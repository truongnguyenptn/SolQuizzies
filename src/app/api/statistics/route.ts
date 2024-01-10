import { prisma } from "@/lib/db";
import { strict_output } from "@/lib/gpt";
import { getAuthSession } from "@/lib/nextauth";
import { getQuestionsSchema } from "@/schemas/questions";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const runtime = "nodejs";
export const maxDuration = 500;

export async function POST(req: Request, res: Response) {
  try {
    console.log("stast api called");
 
    const body = await req.json();
    const { gameId, userId } = body;
    console.log({ gameId}, {userId });
    const attemptCount = await prisma.attempt.count({
      where: {
        gameId: gameId,
        userId: userId,
      },
    });
    const lastAttempt = await prisma.attempt.findFirst({
      where: {
        gameId: gameId,
        userId: userId,
        attemptCount: attemptCount,
      },
    });

    // Find questions for the given game and user
    const questions = await prisma.question.findMany({
      where: {
        gameId: gameId,
      },
      select: {
        id: true,
        question: true,
        options: true,
      },
    });

    // Initialize result object
    let result = {
      accuracy: lastAttempt?.percentageCorrect || 0,
      questions: [],
      time: {
        start: lastAttempt?.createdAt || 0,
        end: lastAttempt?.updatedAt || 1,
      }
    };

    // Loop through each question to gather answers and accuracy
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];

      // Find the answer for the current question
      const answer = await prisma.answer.findFirst({
        where: {
          attemptId: lastAttempt?.id,
          questionId: question.id,
          userId: userId,
        },
      });

      // Add question details and answer to the result
      result.questions.push({
        question: question.question,
        options: question.options,
        userAnswer: answer?.userAnswer,
        isCorrect: answer?.isCorrect,
      });
    }

    return NextResponse.json(result, {
      status: 200,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues },
        {
          status: 400,
        }
      );
    } else {
      console.log(error);
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        {
          status: 500,
        }
      );
    }
  }
}
