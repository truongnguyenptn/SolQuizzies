"use client";
import OpenEnded from "@/components/OpenEnded";
import React from "react";
import LoadingQuestions from "@/components/LoadingQuestions";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { config } from "@/lib/config";

type Props = {
  params: {
    gameId: string;
  };
};
const getQuestions = async (gameId: string) => {
    try {
      const response = await axios.post(`/api/mcq`, { gameId });
      return response;
    } catch (error) {
      console.error("Error retrieving data:", error);
      return { ok: false, error: "Failed to retrieve data" };
    }
  };
const handleStartGame = async (gameId: string, userId: string, router) => {
  try {
    const response = await axios.post(`${config.NEXT_PUBLIC_GPTSERVICE_API_URL}/games/start`, { gameId, userId });
    if (response.data) {
        // Redirect to the play page
        router.push(`/game/play/mcq/${gameId}/${response.data.id}`);
    }}
   catch (error) {
    console.error("Error retrieving data:", error);
    return { ok: false, error: "Failed to retrieve data" };
  }
};
const GamePage = ({ params: { gameId } }: Props) => {



  const { data, isLoading } = useQuery([gameId], () => getQuestions(gameId), {
    enabled: true
  });
  const router = useRouter();
  if ( isLoading ) return <LoadingQuestions finished = {!isLoading}/>;

  return (
    <div>
    <h1>{data?.game?.type}</h1>
    {/* Display other game details */}
    <button onClick={()=>handleStartGame(gameId, "user-test", router)}>Start Game</button>
  </div>    
  );
};

export default GamePage;
