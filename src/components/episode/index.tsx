
import Stars from '@components/stars';
import PlaceholderImage from '@assets/SeriesPlaceholder.svg';
import './episode.scss';
import { Link } from "react-router-dom";

const isEpisode = (episode: IEpisode | PaginationShow): episode is IEpisode => {
  return 'show' in episode && episode.show !== undefined;
};

const Episode = ({ episode }: { episode: IEpisode | PaginationShow }) => {

  const episodeImage = isEpisode(episode)
    ? episode.show?.image?.medium ?? PlaceholderImage
    : episode.image?.medium ?? PlaceholderImage;

  const episodeRating = isEpisode(episode)
    ? episode.show?.rating?.average ?? 0
    : episode.rating?.average ?? 0;

  const episodeName = isEpisode(episode)
    ? episode.show?.name
    : episode.name;

  const episodeLinkId = isEpisode(episode)
    ? episode.show?.id
    : episode.id;

  return (
    <div className="episodeItem fdc aic tal df g1 f1" data-testid="episode">
      <img
        src={episodeImage}
        alt={episodeName ?? 'Placeholder'}
      />

      <div className="mta df fdc g0dot5 w-100">
        <Stars rating={episodeRating} />

        <Link
          to={`/show/${episodeLinkId}`}
          className="min-h-72px df aic threedotstext tal"
        >
          {episodeName}
          {isEpisode(episode) && episode.season && episode.number && (
            ` [Season ${episode.season} Episode ${episode.number}]`
          )}
        </Link>
      </div>
    </div>
  );
};

export default Episode;