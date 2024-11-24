import './showCastInfo.scss'
import NoActorImage from '../../assets/noActorImage.svg'
interface ShowCastInfoProps {

    actorImage: string | undefined,
    actorRelaName: string | undefined,
    actorShowName: string | undefined

}
const ShowCastInfo = (
    {
        actorImage,
        actorRelaName,
        actorShowName
    }: ShowCastInfoProps

) => {
    return (
        <>
            {actorRelaName && (
                <div className="df aic g2res bb1res showCastInfoItem p0dot5x0">
                    <img src={actorImage ?? NoActorImage} alt={actorRelaName + ' - ' + actorShowName} className='actorImage mr1' />
                    <div className='df fdcressmall aicsmall'>
                        <h3 className='m0 tal'>{actorRelaName}</h3>
                        <p className='m0 tal'>{actorShowName}</p>
                    </div>

                </div>
            )}
        </>


    )
}

export default ShowCastInfo