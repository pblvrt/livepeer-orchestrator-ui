import { useEffect, useState } from "react"


export default function InformationPanel({...props}) {


    return (
        <div className=" flex shadow-xl text-white rounded-xl border-2 border-gray mx-3 my-3">
            <div className="self-center m-auto px-3">
                <label className="text-gray-light text-xl">
                    {props.label}
                </label>
                <div className="flex flex-row my-3">
                    <p className="text-lg  w-full">
                        {props.children}
                    </p>
                </div>
            </div>
        </div>
    )


}