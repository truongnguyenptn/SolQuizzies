import { prisma } from "@/lib/db";
import { endGameSchema } from "@/schemas/questions";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    console.log("submit game api called")
    const body = await req.json();
    const { gameId, userId, attemptId } = body;
    console.log ({gameId}, {userId}, {attemptId})
    let accuracy: number = 0;
    const questions = await prisma.question.findMany({
      where: {
        gameId: gameId,
      },
      select: {
        id: true,
        game: true,
        question: true,
        options: true,
      },
    });
    console.log({questions})
  
    let totalCorrect = 0;
         // Loop through each question to gather answers and accuracy
         for (let i = 0; i < questions?.length; i++) {
          const question = questions?.[i];
    
          // Find the answer for the current question
          const answer = await prisma.answer.findFirst({
            where: {
              attemptId: attemptId,
              questionId: question.id,
              userId: userId,
            },
          });
        console.log({answer})

          if (answer?.isCorrect) {
            totalCorrect += 1;
          }
         
        }
   
   
      accuracy = (totalCorrect / questions?.length) * 100;
      await prisma.attempt.update({
        where: {
          id: attemptId,
          userId: userId,
        },
        data: {
          percentageCorrect: accuracy,
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
