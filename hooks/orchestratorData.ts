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

    const [alertMessage, setAlertMessage] = useState({
        active: false,
        message: ""
    })

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
            const data = response.data
            console.log(data.data.transcoders)
            if(data.data.transcoders.length == 0) {
                setAlertMessage({
                    active: true,
                    message: "This address was not found"
                });
            }
        }).catch((e) => {
            console.log(e);
        })
    }

    const submit = (orchestratorAddress:string) => {

        if(orchestratorAddress === ""){
            setAlertMessage({
                active: true,
                message: "Address cannot be empty"
            })
            return
        }
        fetchOrchestratorData(orchestratorAddress);
    }

    return { orchestratorData, submit, alertMessage }
}

export default orchestratorDataHook;