import { useQueries } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import PlaceholderImage from '../../assets/SeriesPlaceholder.svg'
import Stars from '@components/stars'
import ShowInfoItem from "@components/showInfoItem/showInfoItem";
import ShowCastInfo from "@components/showCastInfo/showCastInfo";
import './show.scss'
import Loader from "@components/loader";

const Show = () => {
    const url = 'https://api.tvmaze.com/shows'
    const { show_id } = useParams()

    const fetchShow = async (show_id: number) => {
        const response = await fetch(`${url}/${show_id}`);
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
    };

    const fetchCast = async (show_id: number) => {
        const response = await fetch(`${url}/${show_id}/cast`);
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
    };
    const fetchCrew = async (show_id: number) => {
        const response = await fetch(`${url}/${show_id}/crew`);
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
    };
    const results = useQueries({
        queries: [
            {
                queryKey: ["show", show_id],
                queryFn: () => fetchShow(parseInt(show_id ?? "0")),
            },
            {
                queryKey: ["cast", show_id],
                queryFn: () => fetchCast(parseInt(show_id ?? "0")),
            },
            {
                queryKey: ["crew", show_id],
                queryFn: () => fetchCrew(parseInt(show_id ?? "0")),
            },
        ],
    });
    const [showResult, castResult, crewResult] = results;
    if (showResult.isLoading || castResult.isLoading || crewResult.isLoading) return <Loader />;
    if (showResult.isError || castResult.isError || crewResult.isError) return <p>Error fetching data</p>;


    const show: IShow = showResult.data
    const cast: PersonCharacterInfo[] = castResult.data
    const crew: CrewRole[] = crewResult.data

    return (
        <>
            <header className="posRel pb2">
                <div className="tal zi9">
                    <h1>TV Maze</h1>
                    <div className="df g2 aic fdcressmall500">
                        <img src={show.image?.medium ?? PlaceholderImage} alt={show.name} className="showImageRes" />

                        <div className="df fdc g0dot5">
                            <div className="df aic g1">
                                <Stars rating={show.rating.average ?? 0} /> <b>{show.rating.average ? show.rating.average / 2 : 0}/5</b>
                            </div>
                            <h2 className="m0 showTitle">{show.name}</h2>
                            <p className="m0 description" dangerouslySetInnerHTML={{ __html: show.summary }} />
                        </div>
                    </div>
                </div>
                <div className="posAbs w-100 h-50px bDark posAbs b0 zi0">

                </div>
            </header>
            <main className="posRel pb4">
                {/*   <div className="posAbs w-100 h-200px bGray posAbs t0 zi0">

                </div>
                <div className="zi9">

                   
                </div> */}
                <div className="df fdc g2">
                    <div className="df g2 fdcres">
                        <div className="df fdc g0 f1">
                            <h2 className="tal">Show Info</h2>
                            <div>
                                <ShowInfoItem showInfoLabel={"Streamed on"} showInfoValue={show.network?.name} />
                                <ShowInfoItem showInfoLabel={"Schedule"} showInfoValue={show.schedule.days.join(', ')} />
                                <ShowInfoItem showInfoLabel={"Status"} showInfoValue={show.status} />
                                <ShowInfoItem showInfoLabel={"Genres"} showInfoValue={show.genres.join(', ')} />
                            </div>

                        </div>
                        <div className="df fdc g1 f1">
                            {cast.length > 0 && <h2 className="tal">Starting</h2>}
                            {
                                cast.map((actor: PersonCharacterInfo) => {
                                    return (
                                        <ShowCastInfo key={actor.person.id} actorImage={actor.person.image?.medium} actorRelaName={actor.person.name} actorShowName={actor.character.name} />
                                    )
                                })
                            }
                            {crew.length > 0 && <h2 className="tal">Crew</h2>}

                            {
                                crew.map((crew: CrewRole) => {
                                    return (
                                        <ShowCastInfo key={crew.person.id} actorImage={crew.person.image?.medium} actorRelaName={crew.person.name} actorShowName={crew.type} />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>


            </main>
            <footer className="p1-0">


            </footer>


        </>
    )
}

export default Show