

const GeneralLayout = ({
    children
}) => {

    return (
        <div className="max-w-4xl w-full md:mx-auto mt-5 md:mt-10 mb-auto flex flex-col items-center">
            <div className="w-full md:mx-auto flex flex-col items-center">
                {children}
            </div>
        </div>
    )
}

export default GeneralLayout;