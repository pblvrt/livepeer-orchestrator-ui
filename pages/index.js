
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
        <OrchestratorInfo 
            alertMessage={alertMessage} 
            orchestratorData={orchestratorData} 
            pricePerPixel={pricePerPixel}
            orchestratorAddress={orchestratorAddress}
            setOrchestratorAddress={setOrchestratorAddress}
        />;
    </div>
  )
}
