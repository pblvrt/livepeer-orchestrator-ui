import { useEffect, useState } from "react"


export default function StakeTooltipSquare({ ...props }) {

    const [isOverStaked, setIsOverStaked] = useState(false);

    // LPT value. This value is obtained by http...
    const maximumStake = 154096

    useEffect(() => {
        console.log(parseInt(props.data))
        parseInt(props.data) > maximumStake && setIsOverStaked(true);
    }, [props.data]);


    return (
        <div className=" flex justify-center items-center shadow-xl text-white w-34 sm:w-44 h-20 rounded-xl border-2 border-gray mx-3 my-3">
            <div className="self-center m-auto px-3">
                <label className="text-gray-light text-md">
                    {props.label}
                </label>
                <div className="flex flex-row">
                    <p className="text-lg text-center w-full">
                        {props.data}
                    </p>
                    {isOverStaked && (
                        <div className="w-8">
                            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                viewBox="0 0 512 512" style={{ background: "new 0 0 512 512" }}>
                                <path style={{ fill: "#3B4145" }} d="M322.939,62.642l178.737,309.583C508.231,383.578,512,396.74,512,410.791	c0,42.67-34.592,77.264-77.264,77.264H256L194.189,256L256,23.946C284.62,23.946,309.587,39.519,322.939,62.642z"/>
                                <path style={{ fill: "#525A61;" }} d="M189.061,62.642L10.323,372.225C3.769,383.578,0,396.74,0,410.791 c0,42.67,34.592,77.264,77.264,77.264H256V23.946C227.38,23.946,202.413,39.519,189.061,62.642z"/>
                                <path style={{ fill: "#FFB751" }} d="M474.913,387.678L296.177,78.098c-8.056-13.959-22.849-22.767-38.848-23.22l152.869,402.275h24.539 c25.559,0,46.358-20.798,46.358-46.358C481.095,402.677,478.952,394.683,474.913,387.678z"/>
                                <path style={{ fill: "#FFD764" }} d="M444.853,387.678c3.492,7.005,5.336,14.999,5.336,23.117c0,25.559-17.935,46.358-39.992,46.358 H77.264c-25.559,0-46.358-20.799-46.358-46.358c0-8.118,2.143-16.112,6.181-23.117l178.736-309.58	c8.283-14.34,23.674-23.251,40.177-23.251c0.443,0,0.886,0.01,1.329,0.031c13.732,0.536,26.414,9.323,33.326,23.22L444.853,387.678z"/>
                                <path style={{ fill: "#3B4145;" }} d="M256,354.131v51.509c14.227,0,25.755-11.528,25.755-25.755 C281.755,365.659,270.227,354.131,256,354.131z"/>
                                <path style={{ fill: "#525A61" }} d="M256,354.131c2.843,0,5.151,11.528,5.151,25.755c0,14.227-2.308,25.755-5.151,25.755 c-14.227,0-25.755-11.528-25.755-25.755C230.245,365.659,241.773,354.131,256,354.131z"/>
                                <path style={{ fill: "#3B4145;" }} d="M256,132.646V323.23c14.227,0,25.755-11.538,25.755-25.755V158.401  C281.755,144.174,270.227,132.646,256,132.646z"/>
                                <path style={{ fill: "#525A61;" }} d="M256,132.646c2.843,0,5.151,11.528,5.151,25.755v139.074c0,14.216-2.308,25.755-5.151,25.755 c-14.227,0-25.755-11.538-25.755-25.755V158.401C230.245,144.174,241.773,132.646,256,132.646z"/>
                            </svg>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )


}