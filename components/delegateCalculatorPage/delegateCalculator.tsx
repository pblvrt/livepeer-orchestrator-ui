
import React, { useState } from "react"
//layout
import GeneralLayout from '../layouts/generalLayout';
//Components
import DataTooltipSquare from '../dataTooltipSquare';
import DelgateInput from '../delegateCalculatorPage/delegateInput';
import TimeRangePicker from './timeRangePicker'
//Hooks
import livepeerDataHook from '../../hooks/livepeerData';
import calculations from "../../hooks/calculations";

const DelegateCalculator = ({
    orchestratorData,
    pricePerPixel
}) => {

    const [delegatedStake, setdelegatedStake] = useState(0);

    const { livepeerData } = livepeerDataHook();

    const [timeRange, setTimeRange] = useState(7)
    const {
        calculateStakeOwnershipPercent,
        calculateStakeOwnership,
        calculateEthFee,
        calculateDailiyLptReward,
        calculateDelegatedLptRewards,
        calculateDelegatedETHRewards
    } = calculations(
        orchestratorData.stake,
        livepeerData.totalSupply,
        livepeerData.totalActiveStake,
        livepeerData.weeklyMinutesStreamed,
        pricePerPixel,
        livepeerData.inflation
    );

    const calculatePercetChange = (newValue:number, current:number):string => {
        return ((newValue - current)/(current)*100).toFixed(2)
    }

    return (
        <GeneralLayout>
            <p className="text-center text-white text-xl py-5">Lpt amount to delegate</p>
            <DelgateInput
                delegatedStake={delegatedStake}
                setdelegatedStake={setdelegatedStake}
                alertMessage={""}
            />
            <div className="mx-auto w-full px-3">
                <p className="text-white text-xl my-8 border-b w-full">Orchestrator stats</p>
                <div className="flex flex-row grid grid-cols-2 lg:grid-cols-4 justify-center w-full">
                    <DataTooltipSquare
                        label={"Total delegated Lpt"} 
                        data={orchestratorData.stake + delegatedStake} 
                        increase={calculatePercetChange(orchestratorData.stake+delegatedStake, orchestratorData.stake)}
                    />
                    <DataTooltipSquare
                        label={"Network stake %"} 
                        data={calculateStakeOwnershipPercent()}
                        increase={calculatePercetChange(calculateStakeOwnership(orchestratorData.stake+delegatedStake), calculateStakeOwnership(orchestratorData.stake))}
                    />
                    <DataTooltipSquare
                        label={"LPT rewards"}
                        data={(calculateDailiyLptReward(orchestratorData.stake+delegatedStake)*7).toFixed(2)}
                        increase={calculatePercetChange(calculateDailiyLptReward(orchestratorData.stake+delegatedStake)*7, calculateDailiyLptReward()*7)}
                    />
                    <DataTooltipSquare
                        label={"ETH rewards"}
                        data={(calculateEthFee(orchestratorData.stake+delegatedStake)).toFixed(5)}
                        increase={calculatePercetChange(calculateEthFee(orchestratorData.stake+delegatedStake), calculateEthFee())}
                    />
                </div>
            </div>
            <div className="mx-auto w-full px-3">
                <div className="flex flex-row text-white text-xl my-8 border-b w-full">
                    <p> Delegator rewards and info </p>
                    <TimeRangePicker setTimeRange={setTimeRange} />    
                </div>
                <div className="flex flex-row grid grid-cols-2 lg:grid-cols-4 justify-center w-full">
                    <DataTooltipSquare 
                        label={"% ownership"} 
                        data={delegatedStake} 
                        owner={((delegatedStake / (orchestratorData.stake + delegatedStake)) * 100).toFixed(2)} 
                    />
                    <DataTooltipSquare 
                        label={"LPT rewards"} 
                        data={(calculateDelegatedLptRewards(delegatedStake, orchestratorData.lptFee)*timeRange).toFixed(2)} 
                    />
                    <DataTooltipSquare 
                        label={"ETH fees reward"} 
                        data={(calculateDelegatedETHRewards(delegatedStake, orchestratorData.ethFee)*timeRange).toFixed(4)} 
                    />
                </div>
            </div>
        </GeneralLayout>
    )
}

export default DelegateCalculator
