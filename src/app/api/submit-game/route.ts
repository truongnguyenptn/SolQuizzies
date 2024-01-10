import { prisma } from "@/lib/db";
import { endGameSchema } from "@/schemas/questions";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { gameId, userId, attemptId } = body;
    let accuracy: number = 0;
    const questions = await prisma.question.findUnique({
      where: {
        id: gameId,
      },
      select: {
        id: true,
        game: true,
        question: true,
      },
    });
    const questionsCount = await prisma.game.count({
      where: {
        id: gameId,
      },
    });
    const gameType = questions?.game.gameType;
    let answers = await prisma.answer.findMany ({
      where: {
        attemptId: attemptId,
        questionId: gameId,
        userId: userId,
      },
    });
    if (gameType === "mcq") {  
      let totalCorrect = answers.reduce((acc, ans) => {
        if (ans.isCorrect) {
          return acc + 1;
        }
        return acc;
      }, 0);

   
      accuracy = (totalCorrect / questionsCount) * 100;
      await prisma.attempt.update({
        where: {
          id: attemptId,
        },
        data: {
          percentageCorrect: accuracy,
        },
      });
    } else if (gameType === "open_ended") {
      let totalPercentage = questions?.reduce((acc, question) => {
        return acc + (question.percentageCorrect ?? 0);
      }, 0);
      accuracy = totalPercentage / questions?.length;
    }
    accuracy = Math.round(accuracy * 100) / 100;
    if (!game) {
      return NextResponse.json(
        {
          message: "Game not found",
        },
        {
          status: 404,
        }
      );
    }
    await prisma.game.update({
      where: {
        id: gameId,
      },
      data: {
        timeEnded: new Date(),
      },
    });
    return NextResponse.json({
      message: "Game ended",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
