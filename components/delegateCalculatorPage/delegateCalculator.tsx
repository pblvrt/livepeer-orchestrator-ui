
import React, { useEffect, useState } from "react"
//Components
import DataTooltipSquare from '../dataTooltipSquare';
import DelgateInput from '../delegateCalculatorPage/delegateInput';
//Hooks
import livepeerDataHook from '../../hooks/livepeerData';
import orchestratorDataHook from '../../hooks/orchestratorData';
import calculations from "../../hooks/calculations";

const DelegateCalculator = () => {

    const [delegatedStake, setdelegatedStake] = useState(0);

    const { livepeerData } = livepeerDataHook();

    const {
        submit,
        alertMessage,
        orchestratorData,
        pricePerPixel
    } = orchestratorDataHook();

    const {
        calculateStakeOwnershipPercent,
        calculateEthFee,
        calculateDailiyLptReward
    } = calculations(
        orchestratorData.stake + delegatedStake,
        livepeerData.totalSupply,
        livepeerData.totalActiveStake,
        livepeerData.weeklyMinutesStreamed,
        pricePerPixel,
        livepeerData.inflation
    );

    useEffect(() => {
        submit("0xc08dbaf4fe0cbb1d04a14b13edef38526976f2fb");
    }, [])

    return (
        <div className="flex flex-col w-full">
            <p className="text-center text-white text-xl py-5">Lpt amount to delegate</p>
            <DelgateInput
                delegatedStake={delegatedStake}
                setdelegatedStake={setdelegatedStake}
                alertMessage={alertMessage}
            />
            <div className="mx-auto w-full px-3">
                <p className="text-white text-xl my-8 border-b w-full">Orchestrator stats</p>
                <div className="flex flex-row grid grid-cols-2 lg:grid-cols-4 justify-center w-full">
                    <DataTooltipSquare
                        label={"Total delegated Lpt"}
                        data={orchestratorData.stake}
                        increase={""}
                    />

                </div>
            </div>
            <div className="mx-auto w-full px-3">
                <p className="text-white text-xl my-8 border-b w-full">Delegator rewards and info</p>
                <div className="flex flex-row grid grid-cols-2 lg:grid-cols-4 justify-center w-full">

                </div>
            </div>
        </div>
    )
}

export default DelegateCalculator
