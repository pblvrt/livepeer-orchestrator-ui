
import React, { useState, useEffect } from "react"
import DataTooltipSquare from '../components/dataTooltipSquare';
import axios from 'axios'

export default function Home() {


  const [totalStake, setTotalStake] = useState(0);
  const [delegateStake, setDelegateStake] = useState(0)
  const [totalNetworkLPT, setTotalNetworkLPT] = useState(0)
  const [totalNetworkStakedLPT, setTotalNetworkStakedLPT] = useState(12164521)
  const [currentInflationRate, setCurrentInflationRate] = useState(0)
  const [totalStreamedMinutes, setTotalStreamedMinutes] = useState(0)
  const [lptFee, setLtpFee] = useState(0)
  const [ethFee, setEthFee] = useState(0)
  const [weiPerPixel, setWeiPerPixel] = useState(0)
  const [activationRound, setActive] = useState(null)
  const [active, setIsActive] = useState(null)
  const [status, setStatus] = useState(null)
  const [transcoderId, setTranscoderId] = useState("0xd0aa1b9d0cd06cafa6af5c1af272be88c38aa831")


  const pixelsInOneSecond = 5944.32

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
        setCurrentInflationRate(parseInt(protocol.inflation)/ 10000000)
        setTotalNetworkStakedLPT(parseInt(protocol.totalActiveStake).toFixed(0))

        const transcoder = res.data.data.transcoders[0];
        setTotalStake(parseInt(transcoder.totalStake));
        setLtpFee(parseInt(transcoder.rewardCut)/1000000);
        setEthFee(parseInt(transcoder.feeShare)/1000000);
        setWeiPerPixel(transcoder.pricePerSegment / 10000000)
        setActive(transcoder.activationRound)
        setIsActive(transcoder.active)
        setStatus(transcoder.status)
      })
      .catch((error) => {
        console.error(error)
      })
  }




  const setAmountToDelegate = (data) => {

    if (typeof data != "string") return false // we only process strings!  
    if (isNaN(data) || isNaN(parseFloat(data))) {
      setDelegateStake(0);
      setTotalStake(totalStake - delegateStake);
      data !== "" && alert("Input a number");
      return false
    }

    var newData = parseInt(data)
    if (delegateStake === 0) newData = delegateStake + newData
    setTotalStake(totalStake + newData - delegateStake)
    setDelegateStake(newData);

  }


  const calculateStakePercent = (stake) => {
    return stake / totalNetworkStakedLPT
  }

  const calculateETHminigReward = () => {
    return ((pixelsInOneSecond * totalStreamedMinutes * (totalStake / totalNetworkStakedLPT) * 1000000 * weiPerPixel) / (10 ** 18)).toFixed(4)

  }

  const calculateEthperround = () => {
    return (calculateETHminigReward() - calculateETHminigReward() * lptFee) * delegateStake / totalStake

  }


  const calculateLPTReward = (stake) => {
    return ((calculateStakePercent(stake)) * ((currentInflationRate * totalNetworkLPT) / 100) * 7)
  }

  const calculatePercentIncrease = () => {

    return (calculateLPTReward(totalStake) - calculateLPTReward(totalStake - delegateStake)) / calculateLPTReward(totalStake - delegateStake) * 100
  }

  const percentIncreaseDelegatedLPT = () => {
    return ((totalStake - (totalStake - delegateStake)) / (totalStake - delegateStake)) * 100
  }

  const calculateLPTperround = () => {
    return (calculateLPTReward(totalStake) - calculateLPTReward(totalStake) * lptFee) * delegateStake / totalStake

  }

  const calculator = () => {
    return (
      <>
        <p className="text-center text-white text-xl py-5">LPT amount to delegate</p>
        <input className="bg-gray w-1/2 mx-auto rounded-xl text-white text-center py-2 px-5 text-xl	"
          value={delegateStake}
          onChange={(e) => setAmountToDelegate(e.target.value)}
        />
        <div className="mx-auto w-full">
          <p className="text-white text-xl my-8 border-b w-full">Orchestrator stats</p>
          <div className="flex flex-row justify-center">
            <DataTooltipSquare label={"Total delegated LPT"} data={totalStake} increase={percentIncreaseDelegatedLPT().toFixed(0)} />
            <DataTooltipSquare label={"Network stake %"} data={(calculateStakePercent(totalStake) * 100).toFixed(5)} />
            <DataTooltipSquare label={"LPT reward"} data={calculateLPTReward(totalStake).toFixed(1)} increase={calculatePercentIncrease().toFixed(1)} />
            <DataTooltipSquare label={"ETH mining reward"} data={calculateETHminigReward()} increase={calculatePercentIncrease().toFixed(0)} />
          </div>
        </div>
        <div className="mx-auto w-full">
          <p className="text-white text-xl my-8 border-b w-full">Delegator rewards and info</p>
          <div className="flex flex-row justify-center">

            <DataTooltipSquare label={"Delegated LPT"} data={delegateStake} owner={((delegateStake / totalStake) * 100).toFixed(1)} />
            <DataTooltipSquare label={"LPT weekly"} data={calculateLPTperround().toFixed(1)} />
            <DataTooltipSquare label={"ETH fees reward"} data={calculateEthperround().toFixed(5)} />
          </div>
        </div>
      </>
    )
  }

  const renderCurrentData = () => {
    return (
      <>
        <p className="text-center text-white text-xl py-5">Orchestrator address</p>
        <input className="bg-gray w-3/4 mx-auto rounded-xl text-white text-center py-2 px-5 text-xl	"
          value={transcoderId}
          onChange={(e) => setTranscoderId(e.target.value)}
        />
        <div className="mx-auto w-full">
          <p className="text-white text-xl my-8 border-b w-full">Livepeer network stats</p>
          <div className="flex flex-row justify-center w-full">
            <DataTooltipSquare label={"Total LPT"} data={totalNetworkLPT} />
            <DataTooltipSquare label={"Total LPT stake"} data={totalNetworkStakedLPT} />
            <DataTooltipSquare label={"Weekly minutes streamed"} data={totalStreamedMinutes} />
            <DataTooltipSquare label={"LPT inflation rate"} data={currentInflationRate} />

          </div>
        </div>
        <div className="mx-auto w-full">
          <p className="text-white text-xl my-8 border-b w-full">Orchestrator stats</p>
          <div className="flex flex-row ">
            <DataTooltipSquare label={"Total delegated LPT"} data={totalStake} />
            <DataTooltipSquare label={"Network stake %"} data={((totalStake / totalNetworkStakedLPT)*100).toFixed(2)} />
            <DataTooltipSquare label={"Wei per pixel"} data={weiPerPixel} />
            <DataTooltipSquare label={"Current activity"} data={active ? "Online" : "Offline"}   />
          </div>
          <div className="flex flex-row  mt-3">
            <DataTooltipSquare label={"LPT reward cut %"} data={lptFee * 100} />
            <DataTooltipSquare label={"ETH reward cut %"} data={ethFee * 100} />
            <DataTooltipSquare label={"Active since round"} data={activationRound} />
            <DataTooltipSquare label={"Status"} data={status} />
          </div>
        </div>
        <div className="mx-auto w-full">
          <p className="text-white text-xl my-8 border-b w-full">Estimated orchestrator rewards (7 days)</p>
          <div className="flex flex-col justify-center">
            <div className="text-white flex flex-row mb-3">
              <p className="text-gray-light text-lg mr-3">Transcoding (eth):</p> network stake % * total pixels streamed * wei per pixel = {((pixelsInOneSecond * totalStreamedMinutes * (totalStake / totalNetworkStakedLPT) * 1000000 * weiPerPixel) / (10 ** 18)).toFixed(4)}
            </div>
            <div className="text-white flex flex-row mb-3">
              <p className="text-gray-light text-lg mr-3">Inflation adjustment (lpt):</p> network stake % * lpt distributed per round * 7 = {((totalStake / totalNetworkStakedLPT) * ((currentInflationRate * totalNetworkLPT) / 100) * 7).toFixed(0)}
            </div>
          </div>
        </div>
      </>
    )
  }

  const renderTabs = () => {

    switch (selected) {
      case 0:
        return renderCurrentData();
      case 1:
        return calculator()
      default:
        return renderCurrentData();
    }
  }


  return (
    <div className="bg-black flex min-h-screen w-full h-full">

      <div className="max-w-4xl	 mx-auto mt-20 mb-auto flex flex-col items-center">
        <div className="flex flex-row w-full mb-8">
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
