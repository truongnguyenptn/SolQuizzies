import { buttonVariants } from "@/components/ui/button";
import { getAuthSession } from "@/lib/nextauth";
import { LucideLayoutDashboard } from "lucide-react";
import Link from "next/link";

import { redirect } from "next/navigation";
import React from "react";
import ResultsCard from "@/components/statistics/ResultsCard";
import AccuracyCard from "@/components/statistics/AccuracyCard";
import TimeTakenCard from "@/components/statistics/TimeTakenCard";
import QuestionsList from "@/components/statistics/QuestionsList";
import { prisma } from "@/lib/db";
import axios from "axios";
import { config } from "@/lib/config";

type Props = {
  params: {
    gameId: string;
  };
};

const getStatistics = async (gameId : string, userId = "testuser" ) => {
  
  try {
    const response = await axios.post(`${config.API_URL}/statistics`, { gameId, userId});
   console.log({
    questions : response.data.questions,
    accuracy: response.data.accuracy,
  })
    return {
      questions : response.data.questions,
      accuracy: response.data.accuracy,
    };
  } catch (error) {
    console.error("Error retrieving data:", error);
    return { ok: false, error: "Failed to retrieve data" };
  }

}
const Statistics = async ({ params: { gameId } }: Props) => {


  const {questions, time, accuracy} = await getStatistics(gameId)




  return (
    <>
      <div className="p-8 mx-auto max-w-7xl">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Summary</h2>
          <div className="flex items-center space-x-2">
            <Link href="/dashboard" className={buttonVariants()}>
              <LucideLayoutDashboard className="mr-2" />
              Back to Dashboard
            </Link>
          </div>
        </div>

        <div className="grid gap-4 mt-4 md:grid-cols-7">
          <ResultsCard accuracy={accuracy} />
          <AccuracyCard accuracy={accuracy} />
          <TimeTakenCard
            timeEnded={new Date(time?.ended ?? 0)}
            timeStarted={new Date(time?.started ?? 0)}
          />
        </div>
        <QuestionsList questions={questions} />
      </div>
    </>
  );
};

export default Statistics;
