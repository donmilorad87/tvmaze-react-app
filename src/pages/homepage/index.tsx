
import homepageStore from "@store/homepage";
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

import {
    useQuery,
} from '@tanstack/react-query'
import Episode from "@components/episode";

import './homepage.scss'
import Loader from "@components/loader";
import Pagination from "@components/pagination/pagination";
import { formatDateToYYYYMMDD } from "@utility/date";
import { db } from "src/database";
import OfflineBadge from "@components/offlineBadge";


const HomepageForObserver = () => {

    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const date: string = homepageStore.date
    const country: string = homepageStore.country

    const showItemes = 18;
    const [limit, setLimit] = useState<number>(0);
    const [offset, setOffset] = useState<number>(showItemes);
    const [data, setData] = useState<IEpisode[]>(homepageStore.data);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    useEffect(() => {
        setOffset(limit + showItemes)
        window.scrollTo({
            top: 0,
            behavior: 'instant' // or 'smooth' if you want animated scroll
        });
    }, [limit])


    const fetchSchedule = async (date: string, country: string) => {

        const response = await fetch(`https://api.tvmaze.com/schedule?date=${date}&country=${country}`)
            .then((res) => res.json())
            .then(async (data: IEpisode[]) => {

                try {

                    const getEpisodes = await db.episodes.get({
                        date: date,
                        country: country
                    });

                    if (!getEpisodes) {
                        await db.episodes.add({
                            episodes: data,
                            date: date,
                            country: country
                        });
                    }

                } catch (error) {
                    console.log(error);

                }

                return data
            })


        setData(response)
        return response;


    };

    const { isPending, isLoading, error } = useQuery({
        queryKey: ['schedule', date, country],
        queryFn: () => fetchSchedule(date, country),
    })

    useEffect(() => {
        if (!isOnline) {

            async function getEpisodes() {
                const episodes = await db.episodes.get({
                    date: date,
                    country: country
                });


                if (episodes?.episodes) {
                    setData(episodes.episodes)
                } else {
                    setData([])
                }

            }

            getEpisodes()

        }
    }, [isOnline, date, country])

    if (isOnline) {
        if (isPending) return <Loader />
        if (isLoading) return <Loader />
        if (error) return 'An error has occurred: ' + error.message
    }



    const dateOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLimit(0);
        setOffset(showItemes);
        homepageStore.setDate(formatDateToYYYYMMDD(new Date(event.target.value)))
    }

    const countryOnChangeHanler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLimit(0);
        setOffset(showItemes);
        homepageStore.setCountry(event.target.value)
    }


    const prevPage = () => {
        window.scrollTo({
            top: 0,
            behavior: 'auto' // or 'smooth' if you want animated scroll
        });

        setLimit(limit - showItemes);

    }

    const nextPage = () => {

        window.scrollTo({
            top: 0,
            behavior: 'auto' // or 'smooth' if you want animated scroll
        });
        setLimit(limit + showItemes);

    }

    const clickOnPagination = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.currentTarget.parentElement?.querySelectorAll('button').forEach(el => el.disabled = false);
        event.currentTarget.disabled = true;

        const index = parseInt(event.currentTarget.textContent ?? "0") - (event.currentTarget.textContent ? 1 : 0)

        setLimit(index * showItemes)
    }


    return (

        <>
            <header>
                <div className="tal">
                    <h1>TV Maze</h1>
                    <p>TV Show and web series database. <br /> Create personalised schedules. Episode guide, cast, crew and <br /> character information.</p>
                </div>

                {isOnline === false && <OfflineBadge />}

            </header>
            <main className="posRel pb4">
                <div className="posAbs w-100 h-150px bGray posAbs t0 zi0">

                </div>
                <div className="zi9">

                    <div className="tal df jcsb fdcres">
                        <h2>Shows by country and date</h2>
                        <div className="df aic g2 fdcressmall aicressmall">

                            <div className="df aic g1">
                                <label htmlFor="start">Date of show:</label>

                                <input type="date" id="start" className="p0dot5" name="trip-start" onChange={dateOnChangeHandler} value={date} min="1987-01-01" max="2030-12-31" />

                            </div>
                            <div className="df aic g1">
                                <label htmlFor="country">Country</label>
                                <select name="country" id="country" className="p0dot5" value={country} onChange={countryOnChangeHanler}>
                                    <option value="US">US</option>
                                    <option value="GB">GB</option>
                                    <option value="DE">DE</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className=" mt1 g1 df fww">

                        {data.length === 0 && !isOnline &&
                            (
                                <div className="tal df jcsb fdcres">
                                    <h2>You are trying to reach not fetched data in offline mode</h2>
                                </div>
                            )
                        }

                        {data.length > 0 && (

                            data.slice(limit, offset).map((episode: IEpisode) => {

                                return (
                                    <Episode episode={episode} key={episode.id} />
                                )

                            })
                        )
                        }

                        {
                            data.length === 0 && isOnline && (
                                (
                                    <div className="tal df jcsb fdcres">
                                        <h2>No shows found</h2>
                                    </div>
                                )
                            )
                        }

                    </div>
                </div>



            </main>
            <footer className="p1-0">
                <Pagination
                    withPaginationButtons={0}
                    prevPage={prevPage}
                    prevPageDisabled={limit === 0}
                    showItems={showItemes}
                    limit={limit}
                    dataLength={data.length}
                    pageNumber={(limit / showItemes) + 1}
                    clickOnPagination={clickOnPagination}
                    nextPage={nextPage}
                    nextPageDisabled={limit + showItemes >= data.length}
                />
            </footer>


        </>


    )
}



const Homepage = observer(HomepageForObserver)

export default Homepage