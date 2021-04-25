import axios from 'axios';
import { useEffect, useState } from 'react';

type LivepeerData = {
    readonly inflation:string,
    readonly inflationChange:string,
    readonly totalActiveSupply:string,
    readonly totalSupply:string
}


const livepeerDataHook = () => {

    const [livepeerData, setLivepeerData] = useState<LivepeerData>()

    useEffect(() => {
        fetchLivepeerData();
    }, [])

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
            console.log(response.data)
            setLivepeerData(response.data.protocol);
        }).catch((e) => {
            console.log(e);
        })
    }

    return livepeerData
}

export default livepeerDataHook;