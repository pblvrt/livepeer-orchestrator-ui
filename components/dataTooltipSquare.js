import { useEffect } from "react"


export default function DataTooltipSquare ({...props}){

    
    return (
        <div className=" flex justify-center items-center shadow-xl text-white w-42 h-20 rounded-xl border-2 border-gray mx-3 my-3">
            <div className="self-center m-auto px-3">
            <label className="text-gray-light text-md">
                {props.label}
            </label>
            <div className="flex flex-row">
                <p className="text-lg text-center">
                    {props.data}
                </p>
                {props.increase && (
                    <div className="text-green text-lg ml-3">
                        {`+${props.increase}%`}
                    </div>
                )}
                {props.owner && (
                    <div className="text-green text-lg ml-3">
                        {`(${props.owner}%)`}
                    </div>
                )}
            </div>
            </div>
        </div>
    )


} 