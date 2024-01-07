"use client"
import React from 'react';
import DetailsDialog from "@/components/DetailsDialog";
import PrizeColumnCard from "@/components/prize-set-up/PrizeColumnCard";
import {MintNFTForm} from "@/components/prize-set-up/mint-nft-form";


const Page = () => {
    let whatIsThisMessage = "Set up prizes for players";
    return (
        <main className="p-8 mx-auto max-w-7xl">
      <div className="flex items-center">
        <h2 className="mr-2 text-3xl font-bold tracking-tight">Prize Set up</h2>
        <DetailsDialog 
            message= {whatIsThisMessage}
        />
      </div>

      <div className="grid gap-4 mt-4 md:grid-cols-2">
        {/* <QuizMeCard /> */}
        {/* <HistoryCard /> */}
      </div>
      <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7">
        {/* <HotTopicsCard />
        <RecentActivityCard /> */}
      </div>
      <div>
        <PrizeColumnCard/>
        {/* <MintNFTForm/> */}
      </div>
    </main>
    );
};

export default Page;
