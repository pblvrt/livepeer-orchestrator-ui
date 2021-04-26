import axios from 'axios';
import { useEffect, useState } from 'react';


const livepeerDataHook = () => {

    const [livepeerData, setLivepeerData ] = useState({
        inflation: 0,
        inflationChange: 0,
        totalActiveStake: 0.0,
        totalSupply: 0.0,
        weeklyMinutesStreamed: 0
    })

    useEffect(() => {
        fetchLivepeerData();
    }, []);

    const fetchLivepeerData = async () => {
        axios.post('https://api.thegraph.com/subgraphs/name/livepeer/livepeer', {
            query: `{
                        protocol(id: "0") {
                        inflation 
                        inflationChange
                        totalActiveStake
                        totalSupply
                        }
                    }`
        }).then((response) => {
            const data = response.data.data.protocol

            const dataToInt = {
                inflation: (parseInt(data.inflation)/10000000),
                inflationChange:parseInt(data.inflationChange),
                totalActiveStake: parseInt(data.totalActiveStake.split(".")[0]),
                totalSupply: parseInt(data.totalSupply.split(".")[0]),
                weeklyMinutesStreamed: 398470
            }
            setLivepeerData(dataToInt);
        }).catch((e) => {
            console.log(e);
        })
    }

    return { livepeerData }
}

export default livepeerDataHook;