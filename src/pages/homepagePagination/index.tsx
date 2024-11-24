


import { useEffect, useState } from 'react';

import {
    useQuery,
} from '@tanstack/react-query'
import Episode from "@components/episode";

import './homepagePagination.scss'
import Loader from "@components/loader";
import Pagination from '@components/pagination/pagination';
import paginationStore from '@store/pagination';

import { db } from 'src/database';

const Homepage = () => {

    const [isOnline, setIsOnline] = useState(navigator.onLine);

    const [page, setPage] = useState<number>(paginationStore.page);
    const [inputValue, setInputValue] = useState<number>(paginationStore.page);
    const [lastPage, setLastPage] = useState<boolean>(false);
    const [episodes, setEpisodes] = useState<PaginationShow[]>([]);

    const storedPage = paginationStore.page

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
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [page])


    useEffect(() => {

        const handler = setTimeout(() => {
            setPage(inputValue);
            setStorePage(inputValue);
        }, 1000);

        return () => {
            clearTimeout(handler);
        };

    }, [inputValue]);

    const setStorePage = (page: number) => {
        paginationStore.setPage(page)
    }

    const fetchSchedule = async (page: number,) => {
        const response = await fetch(`https://api.tvmaze.com/shows?page=${page}`)
            .then((res) => res.json())
            .then(async (data) => {
                if (data.length === 0) {
                    setPage(inputValue)
                    setStorePage(inputValue);
                    setLastPage(true)
                } else {
                    setLastPage(false)
                    setStorePage(inputValue);
                    setPage(inputValue)
                }


                try {

                    const getEpisodes = await db.shows.get({
                        page: page
                    });

                    if (!getEpisodes) {
                        await db.shows.add({
                            episodes: data,
                            page: page
                        });

                    }

                } catch (error) {
                    console.log(error);

                }

                return data

            })
        setEpisodes(response)
        return response;
    };

    const { isPending, isLoading, error } = useQuery({
        queryKey: ['schedule', page],
        queryFn: () => fetchSchedule(storedPage),
    })


    useEffect(() => {
        if (!isOnline) {

            async function getEpisodes() {
                const episodes = await db.shows.get({
                    page: page
                });


                if (episodes?.episodes) {
                    setEpisodes(episodes.episodes)
                } else {
                    setEpisodes([])
                }

            }

            getEpisodes()

        }
    }, [isOnline, page])

    if (isOnline) {
        if (isPending) return <Loader />
        if (isLoading) return <Loader />
        if (error) return 'An error has occurred: ' + error.message
    }



    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    const prevPage = () => {
        scrollToTop();

        setInputValue(page - 1);
        setPage(page - 1);
        setStorePage(page - 1);

    }

    const nextPage = () => {
        scrollToTop();

        setInputValue(page + 1);
        setPage(page + 1);
        setStorePage(page + 1);
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(parseInt(event.target.value))
    };

    return (

        <>
            <header>
                <div className="tal">
                    <h1>TV Maze</h1>
                    <p>TV Show and web series database. <br /> Create personalised schedules. Episode guide, cast, crew and <br /> character information.</p>
                </div>

            </header>
            <main className="posRel pb4">
                <div className="posAbs w-100 h-150px bGray posAbs t0 zi0">

                </div>
                <div className="zi9">

                    <div className="tal df jcsb fdcres">
                        <h2>All shows</h2>
                    </div>

                    <div className=" mt1 g1 df fww">
                        {episodes.length === 0 && !isOnline &&
                            (
                                <div className="tal df jcsb fdcres">
                                    <h2>You are trying to reach not fetched data in offline mode</h2>
                                </div>
                            )
                        }
                        {episodes.length > 0 &&
                            (episodes.map((episode: PaginationShow) => {

                                return (
                                    <Episode episode={episode} key={episode.id} />
                                )

                            }))
                        }
                        {
                            episodes.length === 0 && isOnline && (
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
                    withPaginationButtons={1}
                    prevPage={prevPage}
                    prevPageDisabled={storedPage === 1}
                    handleChange={handleChange}
                    inputValue={inputValue}
                    nextPage={nextPage}
                    nextPageDisabled={lastPage}
                />
            </footer>
        </>
    )
}

export default Homepage