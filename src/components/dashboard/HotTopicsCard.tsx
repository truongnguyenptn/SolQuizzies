import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WordCloud from "../WordCloud";
import axios from "axios";

type Props = {};

const getTopics = async ()=> {
  const data = await axios.get(`http://127.0.0.1:3000/api/topic`,);
  return data.data.formattedTopics;
}

const HotTopicsCard = async (props: Props) => {
  // const topics = await prisma.topic_count.findMany({});
  // const formattedTopics = topics.map((topic) => {
  //   return {
  //     text: topic.topic,
  //     value: topic.count,
  //   };
  // });
  const formattedTopics = await getTopics();
  console.log(formattedTopics);
  return (
    <Card className="">
      <CardHeader className="col-span-4 ">
        <CardTitle className="text-2xl font-bold ">Hot Topics</CardTitle>
        <CardDescription>
          Click on a topic to start a quiz on it.
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2 col-span-6">
        <WordCloud formattedTopics={formattedTopics} />
      </CardContent>
    </Card>
  );
};

export default HotTopicsCard;
