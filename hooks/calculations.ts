
/**
 * 
 * @param currentOrchestratorStake 
 * @param totalNetworkLPT 
 * @param totalNetworkStakedLPT 
 * @param totalStreamedMinutes 
 * @param weiPerPixel 
 * @param currentInflationRate  
 */
 const calculations = (
  currentOrchestratorStake:number,
  totalNetworkLPT:number,
  totalNetworkStakedLPT:number,
  totalStreamedMinutes:number,
  weiPerPixel:number,
  currentInflationRate:number
) => {

  /**
   * @description Calculates % of stake ownership relative to total LPT as string
   * @param {int} stake will delfault to currentOrchestratorStake
   * @returns {string} returns precentage as string
   */
  const calculateStakeOwnershipPercent = ( stake:number = currentOrchestratorStake ): string => {
    return ((stake / totalNetworkStakedLPT) * 100).toFixed(4)
  }
 

  /**
   * @description Calculates stake ownership relative to total LPT for a specifc stake
   * @param {int} stake
   * @returns {number} returns precentage as string
   */
   const calculateStakeOwnership = ( stake:number ): number => (stake / totalNetworkStakedLPT)


   /**
    * @description 
    * @param stake 
    * @returns {number}
    */
  const calculateEthFee = ( stake:number = currentOrchestratorStake ): number => {
    const pixelsInOneSecond = 5944.32 * 1000000 //Based on streamflows economical model
    return ((pixelsInOneSecond * totalStreamedMinutes * calculateStakeOwnership(stake) * weiPerPixel) / (10 ** 18))
  }


   /**
    * @description 
    * @param stake 
    * @returns {number}
    */
  const calculateDailiyLptReward = ( stake:number = currentOrchestratorStake ): number => {
    return calculateStakeOwnership(stake) * (currentInflationRate / 100) * totalNetworkLPT
  }

  // /**
  //  * Calculates daily LPT Reward increase based on the stake to delegate
  //  * @returns number
  //  */
  // const calculateDailiyLptRewardPercentIncrease = ( delegatedStake:number ) =>
  //   ((calculateDailiyLptReward(stake + delegatedStake) - calculateDailiyLptReward(stake)) / calculateDailiyLptReward(stake)) * 100

 
  // const stakedLPTpercentIncrease = (delegatedStake:number) =>
  //   ((calculateStakePercent( stake + delegatedStake ) - calculateStakePercent(stake)) / calculateStakePercent(stake)) * 100




   return {
    calculateStakeOwnershipPercent,
    calculateEthFee,
    calculateDailiyLptReward
  }



  // //  const calculateDailyEthFeePercentIncrease = () =>
  // //   ((calculateDailyEthFee(stake + delegatedStake) - calculateDailyEthFee(stake)) / calculateDailyEthFee(stake)) * 100

  // // /**
  // //  * 
  // //  * @returns 
  // //  */
  // // const calculateDelegatedEthFee = () => 
  // //   (calculateDailyEthFee(totalStake) - calculateDailyEthFee(totalStake) * ethFee) * (delegatedStake / totalStake)

  // // /**
  // //  * 
  // //  * @returns 
  // //  */
  // // const calculateDelegatedLptRewards = () => 
  // //   (calculateDailiyLptReward(totalStake) - calculateDailiyLptReward(totalStake) * ethFee) * (delegatedStake / totalStake)


}

export default calculations;