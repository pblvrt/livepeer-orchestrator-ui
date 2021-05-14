
import React, { useEffect, useState } from "react"
import { useRouter } from 'next/router';

import livepeerDataHook from '../hooks/livepeerData';
//Components
import DelegateCalculator from '../components/delegateCalculatorPage/delegateCalculator';
import orchestratorDataHook from '../hooks/orchestratorData';
import LoadingScreen from '../components/generalComponents/loadingScreen';


export default function Home() {

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [orchestratorAddress, setOrchestratorAddress] = useState(null);

  const { livepeerData } = livepeerDataHook();
  const { orchestratorData, pricePerPixel } = orchestratorDataHook(orchestratorAddress);

  useEffect(() => {
    const address = router.query.address;
    if (address !== "") {
      setOrchestratorAddress(address);
      setIsLoading(false);
    } else {
      router.push("/");
    }
  }, [router.query.address])

  return (
    <div className="bg-black flex min-h-screen w-full h-full">
      {isLoading ?
        <LoadingScreen />
        :
        <DelegateCalculator 
          orchestratorData={orchestratorData} 
          pricePerPixel={pricePerPixel} 
          livepeerData={livepeerData} 
        />
      }
    </div>
  )
}
