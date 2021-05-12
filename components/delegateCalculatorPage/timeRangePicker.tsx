import { useState, useEffect } from "react"


const TimeRangePicker = ({
    setTimeRange
}) => {
    
    const [selected, setSelected] = useState(0)
    const [timeRanges, setTimeRanges] = useState([7,30,365])

    return (
        <div className="flex flex-row text-sm text-gray-light ml-2">
            {timeRanges.map((timeRange, index) => {
                return (    
                    <div
                        key={index}
                        className={`${selected === index ? "text-green" : "text-gray-light"} cursor-pointer border rounded-xl px-3 mb-3 mx-1`}
                        onClick={() => {setTimeRange(timeRange); setSelected(index)}}
                    >
                        {timeRange} days
                    </div>
                )
            })}
        </div>
    )


}

export default TimeRangePicker;