
import React from "react";

//Components
import OrchestratorInfo from '../components/orchestratorInfoPage/orchestratorInfo';
import orchestratorDataHook from '../hooks/orchestratorData';

export default function Home() {

  
  const {
    alertMessage,
    orchestratorData,
    pricePerPixel,
    orchestratorAddress,
    setOrchestratorAddress
  } = orchestratorDataHook();



  return (
    <div className="bg-black flex min-h-screen w-full h-full">
      <div className="max-w-4xl	 w-full md:mx-auto mt-5 md:mt-10 mb-auto flex flex-col items-center">
        <OrchestratorInfo 
            alertMessage={alertMessage} 
            orchestratorData={orchestratorData} 
            pricePerPixel={pricePerPixel}
            orchestratorAddress={orchestratorAddress}
            setOrchestratorAddress={setOrchestratorAddress}
        />;
      </div>
    </div>
  )
}
