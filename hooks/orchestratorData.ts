import axios from 'axios';
import { useEffect, useState } from 'react';

export type orchestratorDataType = {
    stake: number,
    lptFee: number,
    ethFee: number,
    activationRound: string,
    active: string,
    status: string
}

const orchestratorDataHook = () => {

    const [orchestratorData, setOrchestratorData ] = useState<orchestratorDataType>({
        stake: 0,
        lptFee: 0,
        ethFee: 0,
        activationRound: "",
        active: "",
        status: ""
    });

    const [orchestratorAddress, setOrchestratorAddress] = useState("0x9c10672cee058fd658103d90872fe431bb6c0afa")

    const [pricePerPixel, setPricePerpixel ] = useState(0)

    const [alertMessage, setAlertMessage] = useState({
        active: false,
        message: ""
    })


    useEffect(() => {
        if(orchestratorAddress === ""){
            setAlertMessage({
                active: true,
                message: "Address cannot be empty"
            })
            return
        }
        console.log("orchestrator address: ", orchestratorAddress)
        fetchOrchestratorData();
        fetchOrchestratorPrice();
    }, [orchestratorAddress])


    
    const fetchOrchestratorData = async () => {
        axios.post('https://api.thegraph.com/subgraphs/name/livepeer/livepeer', {
            query: `{
                transcoders(where: {id: "${orchestratorAddress}"}) {
                    id
                    totalStake
                    rewardCut
                    feeShare
                    active
                    status
                    activationRound
                  }
            }`
        }).then((response) => {
            const data = response.data.data.transcoders
            console.log(data)
            if(data.length == 0) {
                setAlertMessage({
                    active: true,
                    message: "This address was not found"
                });
            }else{
                setOrchestratorData({
                    stake: parseInt(data[0].totalStake),
                    lptFee: (parseInt(data[0].rewardCut)/10000),
                    ethFee: (parseInt(data[0].feeShare)/10000),
                    active: data[0].active ? "Active": "Offline",
                    status: data[0].status,
                    activationRound: data[0].activationRound
                })
            }
        }).catch((e) => {
            console.log(e);
            setAlertMessage({
                active: true,
                message: "Something went wrong when fetching the orchestrator data"
            });
        })
    }


    const fetchOrchestratorPrice = (): void => {

        axios.get(`https://nyc.livepeer.com/orchestratorStats?excludeUnavailable=False`).then((
            response
        ) => {
            const orchestratorData = response.data.filter((orchestrator) => orchestrator.Address === orchestratorAddress)
            console.log(orchestratorData)
            orchestratorData.length > 0 && setPricePerpixel(parseFloat(orchestratorData[0].PricePerPixel))
        }).catch((e) => {
            console.log(e)
            setAlertMessage({
                active: true,
                message: "Something went wrong when fetching the prcing data"
            });
        })
    }


    return { 
        orchestratorData, 
        pricePerPixel, 
        alertMessage,
        orchestratorAddress,
        setOrchestratorAddress
    }
}

export default orchestratorDataHook;