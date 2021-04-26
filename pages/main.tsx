
import React, { useState } from "react"
//Components
import OrchestratorInfo from '../components/orchestratorInfoPage/orchestratorInfo';

export default function Home() {

  const [selected, setSelected] = useState(0)

  const renderTabs = () => {

    switch (selected) {
      case 0:
        return <OrchestratorInfo/>;
      case 1:
        return <></>
      default:
        return <OrchestratorInfo/>;
    }
  }


  return (
    <div className="bg-black flex min-h-screen w-full h-full">
      <div className="max-w-4xl	 md:mx-auto my-5 md:my-10 mb-auto flex flex-col items-center">
        <div className="flex flex-row w-full ">
          <div className={`text-lg cursor-pointer w-1/3 text-center ${selected === 0 ? "border-b text-green border-green" : "text-gray"}`}
            onClick={() => setSelected(0)}>
            Orchestrator info
          </div>
          <div className={`text-lg cursor-pointer w-1/3 text-center ${selected === 1 ? "border-b text-green border-green" : "text-gray"}`}
            onClick={() => setSelected(1)}>
            Delegate calculator
          </div>
          <div className={` text-lg  w-1/3 text-center ${selected === 2 ? "border-b border-green" : "text-gray"}`}
            onClick={() => setSelected(0)}>
            Theoretical limit
          </div>
        </div>
        {renderTabs()}
      </div>
    </div>
  )
}
