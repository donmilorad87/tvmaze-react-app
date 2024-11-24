declare global {
    interface IEpisode {
        id: number;
        url: string;
        name: string;
        season: number;
        number: number;
        type: string;
        airdate: string;
        airtime: string;
        airstamp: string;
        runtime: number | null;
        rating: Rating;
        image: Image | null;
        summary: string | null;
        show?: IShow;
        _links: ShowLinks;
    }

    interface IShow {
        id: number;
        url: string;
        name: string;
        type: string;
        language: string;
        genres: string[];
        status: string;
        runtime: number;
        averageRuntime: number;
        premiered: string;
        ended: string | null;
        officialSite: string;
        schedule: Schedule;
        rating: Rating;
        weight: number;
        network: Network | null;
        webChannel: null | string;
        dvdCountry: null | string;
        externals: Externals;
        image: Image | null;
        summary: string;
        updated: number;
        _links: ShowLinks;
    }

    interface Network {
        id: number;
        name: string;
        country: {
            name: string;
            code: string;
            timezone: string;
        };
        officialSite: string | null;
    }

    interface Schedule {
        time: string;
        days: string[];
    }

    interface Rating {
        average: number | null;
    }

    interface Externals {
        tvrage: number | null;
        thetvdb: number | null;
        imdb: string | null;
    }

    interface Image {
        medium?: string;
        original?: string;
    }

    interface ShowLinks {
        self: {
            href: string;
        };
        show?: {
            href: string;
            name?: string;
        };
        previousepisode?: Episode;
        nextepisode?: Episode;
    }

    interface Episode {
        href: string;
        name: string;
    }

    interface CharacterLinks {
        self: {
            href: string;
        };
    }

    interface Character {
        id: number;
        url: string;
        name: string;
        image: Image | null;
        _links: CharacterLinks;
    }

    interface PersonCharacterInfo {
        person: Person;
        character: Character;
        self: boolean;
        voice: boolean;
    }
    interface Country {
        name: string;
        code: string;
        timezone: string;
    }


    interface CastLinks {
        self: {
            href: string;
        };
    }

    interface Person {
        id: number;
        url: string;
        name: string;
        country: Country;
        birthday: string | null;
        deathday: string | null;
        gender: string;
        image: Image | null;
        updated: number;
        _links: CastLinks;
    }
    interface CrewRole {
        type: string;
        person: Person;
    }

    interface PaginationShow {
        id: number;
        url: string;
        name: string;
        type: string;
        language: string;
        genres: string[];
        status: string;
        runtime: number;
        averageRuntime: number;
        premiered: string;
        ended: string | null;
        officialSite: string | null;
        schedule: {
            time: string;
            days: string[];
        };
        rating: Rating;
        weight: number;
        network: Network | null;
        webChannel: Network | null;
        dvdCountry: string | null;
        externals: Externals;
        image: Image | null;
        summary: string;
        updated: number;
        _links: ShowLinks;
    }
}
export { };
