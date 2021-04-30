
import React from "react"
//layout
import GeneralLayout from '../layouts/generalLayout';
//Components
import DataTooltipSquare from '../dataTooltipSquare';
import AddressInput from './addressInput';
//types
import {orchestratorDataType} from '../../hooks/orchestratorData'
//Hooks
import livepeerDataHook from '../../hooks/livepeerData';
import calculations from "../../hooks/calculations";


const OrchestratorInfo = ({
  orchestratorData,
  pricePerPixel,
  alertMessage,
  submit,
  orchestratorAddress,
  setOrchestratorAddress
}) => {

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
              submit={submit} 
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
            <DataTooltipSquare label={"Total delegated Lpt"} data={orchestratorData.stake} />
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
          <div className="flex flex-col justify-center">
            <div className="text-white flex flex-col sm:flex-row mb-3">
              <p className="text-gray-light text-lg mr-3">Transcoding (eth):</p>
                network stake % * total pixels streamed * wei per pixel = {calculateEthFee().toFixed(5)}
            </div>
            <div className="text-white flex flex-col sm:flex-row mb-3">
              <p className="text-gray-light text-lg mr-3">Inflation adjustment (Lpt):</p>
                network stake % * Lpt distributed per round * 7 = {(calculateDailiyLptReward()*7).toFixed(2)}
            </div>
          </div>
        </div>
    </GeneralLayout>
  )
}

export default OrchestratorInfo
