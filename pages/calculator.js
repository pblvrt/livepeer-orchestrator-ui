
import React, { useEffect, useState } from "react"
import { useRouter } from 'next/router';

//Components
import DelegateCalculator from '../components/delegateCalculatorPage/delegateCalculator';
import orchestratorDataHook from '../hooks/orchestratorData';

export default function Home() {


  const router = useRouter();



  const {
    orchestratorData,
    pricePerPixel,
    setOrchestratorAddress,
    alertMessage
  } = orchestratorDataHook();


  // We will get the Orchestrator address from the url
  useEffect(() => {

    console.log(router.query);
    if(router.query.address != ""){
        setOrchestratorAddress(router.query.address);
    }else{
        router.push("/");
    }
  }, [])

  useEffect(() => {
    console.log(alertMessage)
    alertMessage.active && router.push("/");

  }, [alertMessage]);


  return (
    <div className="bg-black flex min-h-screen w-full h-full">
        <DelegateCalculator orchestratorData={orchestratorData} pricePerPixel={pricePerPixel}/>  
    </div>
  )
}
