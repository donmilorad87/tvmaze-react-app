import { useEffect, useRef } from "react";


interface Props {
    withPaginationButtons: number;
    prevPage?: () => void;
    prevPageDisabled?: boolean;
    limit?: number
    showItems?: number;
    dataLength?: number;
    pageNumber?: number;
    clickOnPagination?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    inputValue?: number;
    nextPage: () => void;
    nextPageDisabled?: boolean;
}

const Pagination = ({ withPaginationButtons, prevPage, prevPageDisabled, limit = 0, showItems: showItemes = 0, dataLength = 0, pageNumber, clickOnPagination, handleChange, inputValue = 0, nextPage, nextPageDisabled }: Props) => {

    const targetRef = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {


                        nextPage()
                    }
                });
            },
            {
                root: null, // Viewport is the root
                threshold: 0.1, // Trigger when 10% of the element is visible
            }
        );

        const currentTarget = targetRef.current;

        if (currentTarget) {
            observer.observe(currentTarget); // Start observing the element
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget); // Cleanup on unmount
            }
        };
    }, []);


    const generatePagination = () => {
        const paginationArray = Array.from({ length: Math.ceil(dataLength / showItemes) }, (_, index) => index + 1);
        return (
            paginationArray.map((_, index) => (
                <button key={index} onClick={clickOnPagination} disabled={index === limit / showItemes}> {index + 1}</button>
            ))
        )

    }

    return (
        <div className="df g2 jcc aic">

            <button onClick={prevPage} disabled={prevPageDisabled}> Prev </button>
            {
                withPaginationButtons === 0 && (
                    <>
                        <span className="showSmall500">
                            Current Page: {pageNumber}/{Math.ceil(dataLength / showItemes)}
                        </span>
                        <div className="df g0dot5 aic jcc hideSmall500">
                            {generatePagination()}
                        </div>

                    </>
                )
            }

            {
                withPaginationButtons === 1 && (
                    <>
                        <div className='inputPageNumber'>
                            <label htmlFor="pageNumber">Page </label>
                            <input type="number" id="pageNumber" value={inputValue} onChange={handleChange} />
                        </div>

                    </>
                )
            }


            {
                withPaginationButtons === 2 && (
                    <>
                        <div className="df g0dot5 aic jcc" ref={targetRef}>

                            Load more

                        </div>
                    </>
                )
            }

            <button type="button" onClick={nextPage} disabled={nextPageDisabled}> Next </button>
        </div>
    )
}

export default Pagination