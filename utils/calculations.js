
  /**
   * 
   * @param {int} stake : stake to calculate % of against total network stake
   * @returns returns percetnage
   */
  export const calculateStakePercent = (stake, totalNetworkStakedLPT) => (stake / totalNetworkStakedLPT)


  /**
   * Tries to estimate daliy fee earnings based on the input stake vs network traffic and orchestrator data
   * @param {int} totalStreamdMinutes weekly total streamed minutes for the livepeer network
   * @param {int} stake total stake of the orchestrator || stake to be delegated
   * @param {int} weiPerPixel wei per pixel set by the orchestrator
   * @returns returns eth total rounded to four decimal places
   */
  export const calculateDailyEthFee = (totalStreamedMinutes, stake, weiPerPixel, totalNetworkStakedLPT) => {
    const pixelsInOneSecond = 5944.32 * 1000000 //Based on streamflows economical model
    return ((pixelsInOneSecond * totalStreamedMinutes * calculateStakePercent(stake, totalNetworkStakedLPT) * weiPerPixel) / (10 ** 18)).toFixed(4)
  }

  /**
   * Tries to estimate daliy fee earnings based on the input stake vs network traffic and orchestrator data
   * @param {*} stake total stake of the orchestrator || stake to be delegated
   * @param {*} currentInflationRate inflation rate of the lpt network
   * @param {*} totalNetworkLPT total lpt distributed
   * @returns 
   */
  export const calculateDailiyLptReward = (stake, currentInflationRate, totalNetworkStakedLPT, totalNetworkLPT) =>  
    calculateStakePercent(stake, totalNetworkStakedLPT) * (currentInflationRate/100) * totalNetworkLPT

  /**
   * 
   * @param {*} newTotalStake
   * @param {*} oldTotalStake 
   * @returns integer % increase
   */
  export const stakedLPTpercentIncrease = (newTotalStake, oldTotalStake) => 
    ((calculateDailiyLptReward(newTotalStake) - calculateDailiyLptReward(oldTotalStake)) / calculateDailiyLptReward(oldTotalStake))*100
 
 
 
    /*
  const calculateEthperround = () => {
    return (calculateETHminigReward() - calculateETHminigReward() * lptFee) * delegateStake / totalStake

  }


  const calculateLPTReward = (stake) => {
    return ((calculateStakePercent(stake)) * ((currentInflationRate * totalNetworkLPT) / 100) * 7)
  }
*/

  const calculateDailiyLptRewardPercentIncrease = (newTotalStake, oldTotalStake) => {

    return (calculateLPTReward(totalStake) - calculateLPTReward(totalStake - delegateStake)) / calculateLPTReward(totalStake - delegateStake) * 100
  }

  const percentIncreaseDelegatedLPT = () => {
    return ((totalStake - (totalStake - delegateStake)) / (totalStake - delegateStake)) * 100
  }

  const calculateLPTperround = () => {
    return (calculateLPTReward(totalStake) - calculateLPTReward(totalStake) * lptFee) * delegateStake / totalStake

  }
