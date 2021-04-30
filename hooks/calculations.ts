
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
   * @returns {number}
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
    // console.log("currenet orchestrator stake", currentOrchestratorStake)
    // console.log("recived stake", stake)
    return calculateStakeOwnership(stake) * (currentInflationRate / 100) * totalNetworkLPT
  }


   /**
    * 
    * @param delegatedStake 
    * @param LPTcut 
    * @returns {number}
    */
  const calculateDelegatedLptRewards = (delegatedStake: number, LPTcut:number): number => {
    console.log(LPTcut/100)
    console.log(calculateDailiyLptReward()*(LPTcut/100));
    return (calculateDailiyLptReward() - calculateDailiyLptReward() * (LPTcut/100)) * (delegatedStake / currentOrchestratorStake)
  }


  /**
   * 
   * @param delegatedStake 
   * @param ETHcut 
   * @returns {number}
   */
  const calculateDelegatedETHRewards = (delegatedStake: number, ETHcut:number): number =>
    (calculateEthFee() - calculateEthFee() * (ETHcut/100)) * (delegatedStake / currentOrchestratorStake)
  


   return {
    calculateStakeOwnership,
    calculateStakeOwnershipPercent,
    calculateEthFee,
    calculateDailiyLptReward,
    calculateDelegatedLptRewards,
    calculateDelegatedETHRewards
  }


}

export default calculations;