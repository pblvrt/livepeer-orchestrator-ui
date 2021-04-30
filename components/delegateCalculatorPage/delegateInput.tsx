import { useState, useEffect } from "react"

/**
 * 
 * @param sumbit: function defined in orchestratorDataHook, will trigger a orchestrator address search
 * @returns AddressInput component
 */
const DelegateInput = ({
    alertMessage,
    setdelegatedStake,
    delegatedStake
}) => {
    

    const [localAlertMessage, setLocalAlertMessage ] = useState({
        active: false,
        message: ""
    })

    useEffect(() => {
        setLocalAlertMessage(alertMessage)
    }, [alertMessage])


    const setAmountToDelegate = (data: string) => {

        if (typeof data != "string") return // we only process strings!  
        if (isNaN(parseFloat(data))) {
          setdelegatedStake(0);
          //setTotalStake(totalStake - delegatedStake);
          //data !== "" && alert("Input a number");
          return
        }
    
        var newData = parseInt(data)
        //if (delegatedStake === 0) newData = delegatedStake + newData
        //setTotalStake(totalStake + newData - delegatedStake)
        setdelegatedStake(newData);
    
      }

      
    return (
        <div className=" mx-auto rounded-xl py-2 px-5">
            {localAlertMessage.active ?
                <div className="bg-red flex flex-row w-full mx-auto rounded-xl py-2 px-5">
                    <div className="w-full text-center text-lg">
                        {localAlertMessage.message}
                    </div>
                    <div className="" onClick={() => setLocalAlertMessage({active: false, message: ""})}>
                        close
                    </div>
                </div>
            :
                <input className="bg-gray  mx-auto rounded-xl text-white text-center py-2 px-5 text-xl	"
                    value={delegatedStake}
                    onChange={(e) => setAmountToDelegate(e.target.value)}
                />
            }
        </div>
    )


}

export default DelegateInput;