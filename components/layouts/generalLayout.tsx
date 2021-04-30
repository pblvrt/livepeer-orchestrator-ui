

const GeneralLayout = ({
    children
}) => {

    return (
        <div className="flex w-full">
            <div className="max-w-4xl md:mx-auto flex flex-col items-center">
                {children}
            </div>
        </div>
    )
}

export default GeneralLayout;