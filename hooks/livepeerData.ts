import axios from 'axios';
import { useEffect, useState } from 'react';


const livepeerDataHook = () => {

    const [livepeerData, setLivepeerData ] = useState({
        inflation:"",
        inflationChange:0,
        totalActiveStake:"",
        totalSupply:"",
        weeklyMinutesStreamed: ""
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
                inflation: (parseInt(data.inflation)/10000000).toFixed(5),
                inflationChange:parseInt(data.inflationChange),
                totalActiveStake: parseFloat(data.totalActiveStake).toFixed(0),
                totalSupply:parseFloat(data.totalSupply).toFixed(0),
                weeklyMinutesStreamed: "398470"
            }
            setLivepeerData(dataToInt);
        }).catch((e) => {
            console.log(e);
        })
    }

    return { livepeerData }
}

export default livepeerDataHook;