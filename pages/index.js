
import React, { useState, useEffect } from "react"
import DataTooltipSquare from '../components/dataTooltipSquare';
import axios from 'axios'

export default function Home() {


  const [totalStake, setTotalStake] = useState(0);
  const [delegatedStake, setdelegatedStake] = useState(0)
  const [totalNetworkLPT, setTotalNetworkLPT] = useState(0)
  const [totalNetworkStakedLPT, setTotalNetworkStakedLPT] = useState(12164521)
  const [currentInflationRate, setCurrentInflationRate] = useState(0)
  const [totalStreamedMinutes, setTotalStreamedMinutes] = useState(0)
  const [lptFee, setLtpFee] = useState(0)
  const [ethFee, setEthFee] = useState(0)
  const [weiPerPixel, setWeiPerPixel] = useState(10000)
  const [activationRound, setActive] = useState(null)
  const [active, setIsActive] = useState(null)
  const [status, setStatus] = useState(null)
  const [transcoderId, setTranscoderId] = useState("0xc08dbaf4fe0cbb1d04a14b13edef38526976f2fb")

  const [selected, setSelected] = useState(0);

  useEffect(() => {
    setTotalStreamedMinutes(434958)
    setTotalNetworkLPT(23389306)
    fetchLivepeerData();
  }, [transcoderId])


  const fetchLivepeerData = () => {
    axios.post('https://api.thegraph.com/subgraphs/name/livepeer/livepeer', {
      query: `
  {
    protocol(id: "0") {
      inflation 
      inflationChange
      winningTicketCount
      totalActiveStake
    }
    transcoders(where: {id: "${transcoderId}"}) {
      id
      totalStake
      rewardCut
      feeShare
      pricePerSegment
      active
      status
      activationRound
    }
  }
  `
    })
      .then((res) => {
        const protocol = res.data.data.protocol;
        setCurrentInflationRate(parseInt(protocol.inflation) / 10000000)
        setTotalNetworkStakedLPT(parseInt(protocol.totalActiveStake).toFixed(0))

        const transcoder = res.data.data.transcoders[0];
        setTotalStake(parseInt(transcoder.totalStake));
        setLtpFee(parseInt(transcoder.rewardCut) / 1000000);
        setEthFee(parseInt(transcoder.feeShare) / 1000000);
        console.log(transcoder.pricePerSegment)
        setWeiPerPixel(transcoder.pricePerSegment / 10000000)
        setActive(transcoder.activationRound)
        setIsActive(transcoder.active)
        setStatus(transcoder.status)
      })
      .catch((error) => {
        console.error(error)
      })
  }


  /**
   * 
   * @param {int} stake : stake to calculate % of against total network stake
   * @returns returns percetnage
   */
  const calculateStakePercent = (stake) => (stake / totalNetworkStakedLPT)


  /**
   * Tries to estimate daliy fee earnings based on the input stake vs network traffic and orchestrator data
   * @param {int} totalStreamdMinutes weekly total streamed minutes for the livepeer network
   * @param {int} stake total stake of the orchestrator || stake to be delegated
   * @param {int} weiPerPixel wei per pixel set by the orchestrator
   * @returns returns eth total rounded to four decimal places
   */
  const calculateDailyEthFee = (stake) => {
    const pixelsInOneSecond = 5944.32 * 1000000 //Based on streamflows economical model
    return ((pixelsInOneSecond * totalStreamedMinutes * calculateStakePercent(stake) * weiPerPixel) / (10 ** 18)).toFixed(4)
  }

  /**
   * Tries to estimate daliy fee earnings based on the input stake vs network traffic and orchestrator data
   * @param {*} stake total stake of the orchestrator || stake to be delegated
   * @param {*} currentInflationRate inflation rate of the Lpt network
   * @param {*} totalNetworkLPT total Lpt distributed
   * @returns 
   */
  const calculateDailiyLptReward = (stake) =>
    calculateStakePercent(stake) * (currentInflationRate / 100) * totalNetworkLPT

  /**
   * 
   * @param {*} newTotalStake
   * @param {*} oldTotalStake 
   * @returns integer % increase
   */
  const calculateDailiyLptRewardPercentIncrease = (newTotalStake, oldTotalStake) =>
    ((calculateDailiyLptReward(newTotalStake) - calculateDailiyLptReward(oldTotalStake)) / calculateDailiyLptReward(oldTotalStake)) * 100

  /**
   * 
   * @param {*} newTotalStake 
   * @param {*} oldTotalStake 
   * @returns 
   */
  const stakedLPTpercentIncrease = (newTotalStake, oldTotalStake) =>
    ((calculateStakePercent( newTotalStake) - calculateStakePercent(oldTotalStake)) / calculateStakePercent(oldTotalStake)) * 100


  /**
   * 
   * @param {*} newTotalStake 
   * @param {*} oldTotalStake 
   * @returns 
   */
   const calculateDailyEthFeePercentIncrease = (newTotalStake, oldTotalStake) =>
    ((calculateDailyEthFee(newTotalStake) - calculateDailyEthFee(oldTotalStake)) / calculateDailyEthFee(oldTotalStake)) * 100

  /**
   * 
   * @returns 
   */
  const calculateDelegatedEthFee = () => 
    (calculateDailyEthFee(totalStake) - calculateDailyEthFee(totalStake) * ethFee) * (delegatedStake / totalStake)

  /**
   * 
   * @returns 
   */
  const calculateDelegatedLptRewards = () => 
    (calculateDailiyLptReward(totalStake) - calculateDailiyLptReward(totalStake) * ethFee) * (delegatedStake / totalStake)




  const setAmountToDelegate = (data) => {

    if (typeof data != "string") return false // we only process strings!  
    if (isNaN(data) || isNaN(parseFloat(data))) {
      setdelegatedStake(0);
      setTotalStake(totalStake - delegatedStake);
      data !== "" && alert("Input a number");
      return false
    }

    var newData = parseInt(data)
    if (delegatedStake === 0) newData = delegatedStake + newData
    setTotalStake(totalStake + newData - delegatedStake)
    setdelegatedStake(newData);

  }



  const calculator = () => {
    return (
      <>
        <p className="text-center text-white text-xl py-5">Lpt amount to delegate</p>
        <input className="bg-gray w-1/2 mx-auto rounded-xl text-white text-center py-2 px-5 text-xl	"
          value={delegatedStake}
          onChange={(e) => setAmountToDelegate(e.target.value)}
        />
        <div className="mx-auto w-full px-3">
          <p className="text-white text-xl my-8 border-b w-full">Orchestrator stats</p>
          <div className="flex flex-row grid grid-cols-2 lg:grid-cols-4 justify-center w-full">
            <DataTooltipSquare
              label={"Total delegated Lpt"}
              data={totalStake}
              increase={(((totalStake - (totalStake - delegatedStake))/(totalStake - delegatedStake)*100).toFixed(2))}
            />
            <DataTooltipSquare
              label={"Network stake %"}
              data={(calculateStakePercent(totalStake, totalNetworkLPT) * 100).toFixed(4)}
              increase={stakedLPTpercentIncrease(totalStake, totalStake - delegatedStake).toFixed(2)}
            />
            <DataTooltipSquare
              label={"LPT rewards(7 days)"}
              data={(calculateDailiyLptReward(totalStake)*7).toFixed(2)}
              increase={calculateDailiyLptRewardPercentIncrease(totalStake, totalStake - delegatedStake).toFixed(2)}
            />
            <DataTooltipSquare 
              label={"ETH fees (7 days)"} 
              data={(calculateDailyEthFee(totalStake)*7).toFixed(4)} 
              increase={(calculateDailyEthFeePercentIncrease(totalStake, totalStake - delegatedStake)).toFixed(2)} 
            />
          </div>
        </div>
        <div className="mx-auto w-full px-3">
          <p className="text-white text-xl my-8 border-b w-full">Delegator rewards and info</p>
          <div className="flex flex-row grid grid-cols-2 lg:grid-cols-4 justify-center w-full">
            <DataTooltipSquare 
              label={"Delegated LPT"} 
              data={delegatedStake} 
              owner={((delegatedStake / totalStake) * 100).toFixed(2)} 
            />
            <DataTooltipSquare 
              label={"LPT rewards(7 days)"} 
              data={(calculateDelegatedLptRewards()*7).toFixed(2)} 
            />
            <DataTooltipSquare 
              label={"ETH fees reward"} 
              data={(calculateDelegatedEthFee()*7).toFixed(4)} 
            />
          </div>
        </div>
      </>
    )
  }

  const renderOrchestratorInfo = () => {
    return (
      <>
        <p className="text-center text-white text-xl py-5">Orchestrator address</p>
        <input className="bg-gray w-3/4 mx-auto rounded-xl text-white text-center py-2 px-5 text-xl	"
          value={transcoderId}
          onChange={(e) => setTranscoderId(e.target.value)}
        />
        <div className="mx-auto w-full px-3">
          <p className="text-white text-xl my-8 border-b w-full">Livepeer network stats</p>
          <div className="flex flex-row grid grid-cols-2 lg:grid-cols-4 justify-center w-full">
            <DataTooltipSquare label={"Total Lpt"} data={totalNetworkLPT} />
            <DataTooltipSquare label={"Total Lpt stake"} data={totalNetworkStakedLPT} />
            <DataTooltipSquare label={"Weekly minutes streamed"} data={totalStreamedMinutes} />
            <DataTooltipSquare label={"Lpt inflation rate %"} data={currentInflationRate} />
          </div>
        </div>
        <div className="mx-auto w-full px-3">
          <p className="text-white text-xl my-8 border-b w-full">Orchestrator stats</p>
          <div className="flex flex-row grid grid-cols-2 lg:grid-cols-4 justify-center w-full">
            <DataTooltipSquare label={"Total delegated Lpt"} data={totalStake} />
            <DataTooltipSquare
              label={"Network stake %"}
              data={(calculateStakePercent(totalStake)*100).toFixed(4)} 
            />
            <DataTooltipSquare label={"Wei per pixel"} data={weiPerPixel} />
            <DataTooltipSquare label={"Current activity"} data={active ? "Online" : "Offline"} />
          </div>
          <div className="flex flex-row grid grid-cols-2 lg:grid-cols-4 justify-center w-full">
            <DataTooltipSquare label={"Lpt reward cut %"} data={lptFee * 100} />
            <DataTooltipSquare label={"ETH reward cut %"} data={ethFee * 100} />
            <DataTooltipSquare label={"Active since round"} data={activationRound} />
            <DataTooltipSquare label={"Status"} data={status} />
          </div>
        </div>
        <div className="mx-auto w-full px-3">
          <p className="text-white text-xl my-8 border-b w-full">Estimated orchestrator rewards (7 days)</p>
          <div className="flex flex-col justify-center">
            <div className="text-white flex flex-col sm:flex-row mb-3">
              <p className="text-gray-light text-lg mr-3">Transcoding (eth):</p>
                network stake % * total pixels streamed * wei per pixel = {(calculateDailyEthFee(totalStake) * 7).toFixed(4)}
            </div>
            <div className="text-white flex flex-col sm:flex-row mb-3">
              <p className="text-gray-light text-lg mr-3">Inflation adjustment (Lpt):</p>
               network stake % * Lpt distributed per round * 7 = {(calculateDailiyLptReward(totalStake) * 7).toFixed(2)}
            </div>
          </div>
        </div>
      </>
    )
  }

  const renderTabs = () => {

    switch (selected) {
      case 0:
        return renderOrchestratorInfo();
      case 1:
        return calculator()
      default:
        return renderOrchestratorInfo();
    }
  }


  return (
    <div className="bg-black flex min-h-screen w-full h-full">

      <div className="max-w-4xl	 md:mx-auto my-5 md:my-10 mb-auto flex flex-col items-center">
        <div className="flex flex-row w-full md:mb-8">
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
