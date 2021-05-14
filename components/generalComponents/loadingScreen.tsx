import { useEffect, useState } from "react"


export default function LoadingScreen({ ...props }) {


    return (
        <div className="bg-black flex min-h-screen w-full h-full justify-center items-center">
            <div className="animate-pulse text-green text-lg">
                LOADING
            </div>
        </div>
    )

}