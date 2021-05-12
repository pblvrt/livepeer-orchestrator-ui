
import React from "react"
//layout
import GeneralLayout from '../layouts/generalLayout';
//Components
import DataTooltipSquare from '../generalComponents/dataTooltipSquare';
import StakeTooltipSquare from '../generalComponents/stakeTooltipSquare'; 
import AddressInput from './addressInput';
//Hooks
import livepeerDataHook from '../../hooks/livepeerData';
import calculations from "../../hooks/calculations";
import { useRouter } from 'next/router';


const OrchestratorInfo = ({
  orchestratorData,
  pricePerPixel,
  alertMessage,
  orchestratorAddress,
  setOrchestratorAddress
}) => {

  const router = useRouter();
  const { livepeerData } = livepeerDataHook();

  const {
    calculateStakeOwnershipPercent,
    calculateEthFee,
    calculateDailiyLptReward
  } = calculations(
    orchestratorData.stake,
    livepeerData.totalSupply,
    livepeerData.totalActiveStake,
    livepeerData.weeklyMinutesStreamed,
    pricePerPixel,
    livepeerData.inflation
  );


  return (
      <GeneralLayout>
        <p className="text-center text-white text-xl py-5">Orchestrator address</p>
            <AddressInput 
              orchestratorAddress={orchestratorAddress}
              setOrchestratorAddress={setOrchestratorAddress}
              alertMessage={alertMessage}
            />
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
            <StakeTooltipSquare label={"Total delegated Lpt"} data={orchestratorData.stake} />
            <DataTooltipSquare label={"Network stake %"} data={calculateStakeOwnershipPercent()} />
            <DataTooltipSquare label={"Wei per pixel"} data={pricePerPixel} />
            <DataTooltipSquare label={"Current activity"} data={orchestratorData.active} />
          </div>
          <div className="flex flex-row grid grid-cols-2 lg:grid-cols-4 justify-center w-full">
            <DataTooltipSquare label={"Lpt reward cut %"} data={orchestratorData.lptFee} />
            <DataTooltipSquare label={"ETH reward cut %"} data={orchestratorData.ethFee} />
            <DataTooltipSquare label={"Active since round"} data={orchestratorData.activationRound} />
            <DataTooltipSquare label={"Status"} data={orchestratorData.status} />
          </div>
        </div>
        <div className="mx-auto w-full px-3">
          <p className="text-white text-xl my-8 border-b w-full">Estimated orchestrator rewards (7 days)</p>
          <div className="flex flex-row grid grid-cols-2 lg:grid-cols-3 justify-center w-full">  
            <DataTooltipSquare label={"Transcoding (ETH)"} data={calculateEthFee().toFixed(3)} />
            <DataTooltipSquare label={"Inflation (LPT)"} data={(calculateDailiyLptReward()*7).toFixed(2)} />
            <div className="cursor-pointer flex justify-center text-lg items-center shadow-xl text-green 
                            h-20 rounded-xl border-green border-2  mx-3 my-3"
                 onClick={() => router.push(`/calculator?address=${orchestratorAddress}`)}                
            >
                Calculate ROI
            </div>
          </div>
        </div>
    </GeneralLayout>
  )
}

export default OrchestratorInfo


