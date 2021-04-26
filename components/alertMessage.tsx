import { useEffect, useState } from "react"


const AlertMessage = ({ alertMessage }) => {

    const [localAlertMessage, setLocalAlertMessage ] = useState({
        active: false,
        message: ""
    })

    useEffect(() => {
        setLocalAlertMessage(alertMessage)
    }, [alertMessage])
    
    return (
        <>
            {localAlertMessage.active &&
                <div className="flex flex-row bg-red w-3/4 mx-auto rounded-xl py-2 px-5 text-lg my-5">
                    <div className="w-full text-center">
                        {localAlertMessage.message}
                    </div>
                    <div className="" onClick={() => setLocalAlertMessage({active: false, message: ""})}>
                        close
                    </div>
                </div>
            }
        </>
    )

}

export default AlertMessage;