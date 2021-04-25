
export const calculations = (
  stake:number,
  totalNetworkLPT:number,
  totalNetworkStakedLPT:number,
  totalStreamedMinutes:number,
  weiPerPixel:number,
  currentInflationRate:number
) => {

  /**
   * 
   * @param {int} stake : stake to calculate % of against total network stake
   * @returns returns int
   */
  const calculateStakePercent = (stake:number) => (stake / totalNetworkStakedLPT)


  /**
   * Calculates aproximate dailiy eth fee gains based solely on staked %
   * @returns ether value (int)
   */
  const calculateDailyEthFee = (stake:number) => {
    const pixelsInOneSecond = 5944.32 * 1000000 //Based on streamflows economical model
    return ((pixelsInOneSecond * totalStreamedMinutes * calculateStakePercent(stake) * weiPerPixel) / (10 ** 18))
  }

  /**
   * Calculates daily LTP returns based on orchestrator stake %
   * @returns number
   */
  const calculateDailiyLptReward = (stake:number) =>
     calculateStakePercent(stake) * (currentInflationRate / 100) * totalNetworkLPT

  /**
   * Calculates daily LPT Reward increase based on the stake to delegate
   * @returns number
   */
  const calculateDailiyLptRewardPercentIncrease = ( delegatedStake:number ) =>
    ((calculateDailiyLptReward(stake + delegatedStake) - calculateDailiyLptReward(stake)) / calculateDailiyLptReward(stake)) * 100

 
  const stakedLPTpercentIncrease = (delegatedStake:number) =>
    ((calculateStakePercent( stake + delegatedStake ) - calculateStakePercent(stake)) / calculateStakePercent(stake)) * 100




  return {
    calculateStakePercent,
    calculateDailyEthFee,
    calculateDailiyLptReward
  }



  //  const calculateDailyEthFeePercentIncrease = () =>
  //   ((calculateDailyEthFee(stake + delegatedStake) - calculateDailyEthFee(stake)) / calculateDailyEthFee(stake)) * 100

  // /**
  //  * 
  //  * @returns 
  //  */
  // const calculateDelegatedEthFee = () => 
  //   (calculateDailyEthFee(totalStake) - calculateDailyEthFee(totalStake) * ethFee) * (delegatedStake / totalStake)

  // /**
  //  * 
  //  * @returns 
  //  */
  // const calculateDelegatedLptRewards = () => 
  //   (calculateDailiyLptReward(totalStake) - calculateDailiyLptReward(totalStake) * ethFee) * (delegatedStake / totalStake)





}