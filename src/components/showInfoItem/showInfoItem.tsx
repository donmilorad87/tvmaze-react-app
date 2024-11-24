import './showInfoItem.scss'
const ShowInfoItem = ({ showInfoLabel, showInfoValue }: { showInfoLabel: string, showInfoValue: string | undefined }) => {
    return (
        <>
            {showInfoValue && (
                <div className="df aicres g2 bb1res showInfoItem fdcressmall aicres tal">
                    <h3>{showInfoLabel}</h3>
                    <p>{showInfoValue}</p>
                </div>
            )}
        </>


    )
}

export default ShowInfoItem