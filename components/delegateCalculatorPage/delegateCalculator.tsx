
import React, { useState } from "react"
//layout
import GeneralLayout from '../layouts/generalLayout';
//Components
import DataTooltipSquare from '../generalComponents/dataTooltipSquare';
import DelgateInput from '../delegateCalculatorPage/delegateInput';
import TimeRangePicker from './timeRangePicker';
import InformationPanel from './informationPanel';
//Hooks
import calculations from "../../hooks/calculations";


const DelegateCalculator = ({
    orchestratorData, pricePerPixel, livepeerData
}) => {

    const [delegatedStake, setdelegatedStake] = useState(0);
    const [timeRange, setTimeRange] = useState(7)

    const {
        calculateStakeOwnershipPercent,
        calculateStakeOwnership,
        calculateEthFee,
        calculateDailiyLptReward,
        calculateDelegatedLptRewards,
        calculateDelegatedETHRewards,
        calculateRealDelegatedETHRewards
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
            <p className="text-center text-white text-xl py-5">LPT amount to delegate</p>
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
                        data={(calculateDailiyLptReward(orchestratorData.stake+delegatedStake)*30).toFixed(2)}
                        increase={calculatePercetChange(calculateDailiyLptReward(orchestratorData.stake+delegatedStake)*7, calculateDailiyLptReward()*7)}
                    />
                    <DataTooltipSquare
                        label={"ETH rewards"}
                        data={(calculateEthFee(orchestratorData.stake+delegatedStake)*4).toFixed(3)}
                        increase={calculatePercetChange(calculateEthFee(orchestratorData.stake+delegatedStake), calculateEthFee())}
                    />
                </div>
            </div>
            <div className="mx-auto w-full px-3">
                <div className="flex flex-row text-white text-xl my-8 border-b w-full">
                    <p> Delegator rewards and info</p>
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
                        label={"ETH fees rewards"} 
                        data={(calculateDelegatedETHRewards(delegatedStake, orchestratorData.ethFee)*timeRange).toFixed(4)} 
                    />
                    <DataTooltipSquare 
                        label={"Real ETH rewards"} 
                        data={(calculateRealDelegatedETHRewards(delegatedStake, orchestratorData.ethFee)*timeRange).toFixed(4)} 
                    />
                </div>
                <div className="flex flex-row grid grid-cols-1 lg:grid-cols-1 justify-center w-full">
                    <InformationPanel label={"Disclaimer"}>
                        <p className="mb-2">All the information displayed here can not be considered official information and it's
                        displayed for research purposes only.</p> 
                        <p className="mb-2">Reward metrics are just predictions and will probably not match the actual rewards you will get when delegating to an orchestrator.</p>
                        <p className="mb-2">You can find the code for this project here, all  contributions are welcome.</p>
                    </InformationPanel>
                </div>
            </div>
        </GeneralLayout>
    )
}

export default DelegateCalculator
