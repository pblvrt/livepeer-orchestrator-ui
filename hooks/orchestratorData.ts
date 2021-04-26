import axios from 'axios';
import { useState } from 'react';

const orchestratorDataHook = () => {

    const [orchestratorData, setOrchestratorData ] = useState({
        stake: "",
        lptFee: "",
        ethFee: "",
        weiPerPixel: "",
        activationRound: "",
        active: "",
        status: ""
    });

    const fetchOrchestratorData = async (orchestratorAddress:string) => {
        axios.post('https://api.thegraph.com/subgraphs/name/livepeer/livepeer', {
            query: `{
                transcoders(where: {id: "${orchestratorAddress}"}) {
                    id
                    totalStake
                    rewardCut
                    feeShare
                    pricePerSegment
                    active
                    status
                    activationRound
                  }
            }`
        }).then((response) => {
            const data = response.data.data.protocol


        }).catch((e) => {
            console.log(e);
        })
    }

    const submit = (orchestratorAddress:string) => {

    }

    return { orchestratorData, submit }
}

export default orchestratorDataHook;