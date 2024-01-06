import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WordCloud from "../WordCloud";
import { prisma } from "@/lib/db";

type Props = {};

const PrizeColumnCard = async (props: Props) => {
  // const topics = await prisma.topic_count.findMany({});
  // const formattedTopics = topics.map((topic) => {
  //   return {
  //     text: topic.topic,
  //     value: topic.count,
  //   };
  // });

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Top 1</CardTitle>
        <CardDescription>
          Set up prizes for top 1 player
        </CardDescription>
      </CardHeader>

      <div className="vertical-line"></div>

      <CardContent className="pl-2">
          
      </CardContent>
    </Card>
  );
};

export default PrizeColumnCard;
