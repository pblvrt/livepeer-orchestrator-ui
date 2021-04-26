
import React, { useState, useEffect } from "react"
//Components
import DataTooltipSquare from '../components/dataTooltipSquare';
import AddressInput from '../components/addressInput';
import AlertMessage from '../components/alertMessage';
//Hooks
import livepeerDataHook from '../hooks/livepeerData';
import orchestratorDataHook from '../hooks/orchestratorData';

export default function Home() {


  const { livepeerData } = livepeerDataHook();
  const { submit, orchestratorData, alertMessage } = orchestratorDataHook()

  return (
    <div className="bg-black flex min-h-screen w-full h-full">
      <div className="max-w-4xl	 md:mx-auto my-5 md:my-10 mb-auto flex flex-col items-center">
        <AlertMessage alertMessage={alertMessage}/> 
        <AddressInput submit={submit}/>
        <div className="mx-auto w-full px-3">
          <p className="text-white text-xl my-8 border-b w-full">Livepeer network stats</p>
          <div className="flex flex-row grid grid-cols-2 lg:grid-cols-4 justify-center w-full">
            <DataTooltipSquare label={"Total Lpt"} data={livepeerData.totalSupply} />
            <DataTooltipSquare label={"Total Lpt stake"} data={livepeerData.totalActiveStake} />
            <DataTooltipSquare label={"Weekly  streamed"} data={livepeerData.weeklyMinutesStreamed} />
            <DataTooltipSquare label={"Lpt inflation rate %"} data={livepeerData.inflation} />
          </div>
        </div>
        <div className="mx-auto w-full px-3">
          <p className="text-white text-xl my-8 border-b w-full">Orchestrator stats</p>
          <div className="flex flex-row grid grid-cols-2 lg:grid-cols-4 justify-center w-full">
            <DataTooltipSquare label={"Total delegated Lpt"} data={""} />
            <DataTooltipSquare label={"Network stake %"} data={""}/>
            <DataTooltipSquare label={"Wei per pixel"} data={""} />
            <DataTooltipSquare label={"Current activity"} data={""} />
          </div>
          <div className="flex flex-row grid grid-cols-2 lg:grid-cols-4 justify-center w-full">
            <DataTooltipSquare label={"Lpt reward cut %"} data={""} />
            <DataTooltipSquare label={"ETH reward cut %"} data={""} />
            <DataTooltipSquare label={"Active since round"} data={""} />
            <DataTooltipSquare label={"Status"} data={""} />
          </div>
        </div>
        <div className="mx-auto w-full px-3">
          <p className="text-white text-xl my-8 border-b w-full">Estimated orchestrator rewards (7 days)</p>
          <div className="flex flex-col justify-center">
            <div className="text-white flex flex-col sm:flex-row mb-3">
              <p className="text-gray-light text-lg mr-3">Transcoding (eth):</p>
                network stake % * total pixels streamed * wei per pixel = {""}
            </div>
            <div className="text-white flex flex-col sm:flex-row mb-3">
              <p className="text-gray-light text-lg mr-3">Inflation adjustment (Lpt):</p>
               network stake % * Lpt distributed per round * 7 = {""}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
