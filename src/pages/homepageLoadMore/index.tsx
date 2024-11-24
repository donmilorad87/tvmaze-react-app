


import { useEffect, useState } from 'react';

import {
    useQuery,
} from '@tanstack/react-query'
import Episode from "@components/episode";


import Loader from "@components/loader";
import Pagination from '@components/pagination/pagination';
import loadMoreStore from '@store/loadmore';
import { db } from "src/database";

const HomepageLoadMore = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [page, setPage] = useState<number>(1);

    const [lastPage, setLastPage] = useState<boolean>(false);

    const episodes = loadMoreStore.data
    const scrollHeight = loadMoreStore.scrollHeight

    const setScrollHeight = (height: number) => {
        loadMoreStore.setScrollHeight(height)
    }

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
            top: scrollHeight, // Scroll to the bottom of the page
            behavior: 'instant' // Smooth scrolling effect
        });


    }, []);

    const fetchSchedule = async (page: number,) => {
        const response = await fetch(`https://api.tvmaze.com/shows?page=${page}`)
            .then((res) => res.json())
            .then(async (data) => {
                if (data.length === 0) {

                    setLastPage(true)
                } else {
                    setLastPage(false)

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

    const setEpisodes = (episodes: PaginationShow[]) => {
        loadMoreStore.setData(episodes)
    }

    const { isPending, isLoading, error } = useQuery({
        queryKey: ['schedule', page],
        queryFn: () => fetchSchedule(page),

    })


    useEffect(() => {
        if (!isOnline) {

            async function getEpisodes() {

                const episodes = await db.shows.orderBy('page').toArray();
                console.log(episodes);

                /* if (episodes?.episodes) {
                    setEpisodes(episodes.episodes)
                } else {
                    setEpisodes([])
                } */

            }

            getEpisodes()

        }
    }, [isOnline, page])

    if (isOnline) {
        if (isPending) return <Loader />
        if (isLoading) return <Loader />
        if (error) return 'An error has occurred: ' + error.message
        console.log(scrollHeight);




    }


    const loadMore = () => {
        if (!lastPage) {
            console.log('loadmore');

            setScrollHeight(window.scrollY)

            setPage(page + 1);
        }

    }


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

                        {episodes.length > 0 ?
                            (episodes.map((episode: PaginationShow, index: number) => {

                                return (
                                    <Episode episode={episode} key={index} />
                                )

                            })) :
                            (
                                <div className="tal df jcsb fdcres">
                                    <h2>No shows found</h2>
                                </div>
                            )
                        }

                    </div>
                </div>



            </main>
            <footer className="p1-0">
                <Pagination
                    withPaginationButtons={2}
                    nextPage={loadMore}
                />
            </footer>
        </>
    )
}

export default HomepageLoadMore