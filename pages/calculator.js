
import React, { useEffect, useState } from "react"
import { useRouter } from 'next/router';

//Components
import DelegateCalculator from '../components/delegateCalculatorPage/delegateCalculator';
import orchestratorDataHook from '../hooks/orchestratorData';

export default function Home() {

  const [selected, setSelected] = useState(0)
  const router = useRouter();
  const [loading, setIsLoading] = useState(true);


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
    // check is data changed, not the most elegant way to do it
    //orchestratorData.activationRound !== "" && setIsLoading(false);

  }, [alertMessage]);


  return (
    <div className="bg-black flex min-h-screen w-full h-full">
      <div className="max-w-4xl	 w-full md:mx-auto mt-5 md:mt-10 mb-auto flex flex-col items-center">
        {loading && <DelegateCalculator orchestratorData={orchestratorData} pricePerPixel={pricePerPixel}/>  }
      </div>
    </div>
  )
}
