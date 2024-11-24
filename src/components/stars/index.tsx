import emptyStar from '@assets/emptyStar.svg'
import fullStar from '@assets/fullStar.svg'
import halfStar from '@assets/halfStar.svg'

const Stars = ({ rating }: { rating: number | null | undefined }) => {

    const currentRating = rating ? rating / 2 : 0;

    return (
        <div className='df ratingStars' data-rating={currentRating} data-real-rating={rating}>
            {
                [1, 2, 3, 4, 5].map((star) => {
                    if (currentRating >= star) {
                        return (
                            <img
                                key={star}
                                src={fullStar}
                                alt='star'
                                width={18}
                                height={18}
                            />
                        )
                    } else if (star - currentRating < 0.5) {

                        return (
                            <img
                                key={star}
                                src={fullStar}
                                alt='star'
                                width={18}
                                height={18}
                            />
                        )
                    } else if (star - currentRating >= 0.5 && star - currentRating < 1 && star - currentRating - 0.5 <= 0.25) {

                        return (
                            <img
                                key={star}
                                src={halfStar}
                                alt='star'
                                width={18}
                                height={18}
                            />
                        )
                    } else {

                        return (
                            <img
                                key={star}
                                src={emptyStar}
                                alt='star'
                                width={18}
                                height={18}
                            />
                        )
                    }
                })
            }
        </div>
    )
}


export default Stars

/* 
import './stars.scss'

const Stars = ({ rating }: { rating: number | null | undefined }) => {

    const realRating = rating || 0

    return (

        <div className='df w-100'>
            {[1, 2, 3, 4, 5].map((star) => {
                return (
                    <span
                        key={star}
                        className='star'
                        style={{
                            color: realRating / 2 >= star ? 'gold' : 'gray',
                        }}
                    >
                        ★
                    </span>
                )
            })}
        </div>
    )
}

export default Stars */