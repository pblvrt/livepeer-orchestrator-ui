
import React, { useState } from "react";

//layout
import GeneralLAyout from '../components/layouts/generalLayout';

//Components
import OrchestratorInfo from '../components/orchestratorInfoPage/orchestratorInfo';
import AddressInput from "../components/orchestratorInfoPage/addressInput";

//hooks
import orchestratorDataHook from '../hooks/orchestratorData';
import livepeerDataHook from '../hooks/livepeerData';

export default function Home() {


  const [orchestratorAddress, setOrchestratorAddress] = useState("0xc08dbaf4fe0cbb1d04a14b13edef38526976f2fb");

  const { livepeerData } = livepeerDataHook();
  const { orchestratorData, pricePerPixel, alertMessage } = orchestratorDataHook(orchestratorAddress);


  return (
    <div className="bg-black flex min-h-screen w-full h-full">
      <GeneralLAyout>
        <p className="text-center text-white text-xl py-5">Orchestrator address</p>
        <AddressInput
          orchestratorAddress={orchestratorAddress}
          setOrchestratorAddress={setOrchestratorAddress}
          alertMessage={alertMessage}
        />
        <OrchestratorInfo
          livepeerData={livepeerData}
          orchestratorData={orchestratorData}
          pricePerPixel={pricePerPixel}
        />;
      </GeneralLAyout>
    </div>
  )
}
