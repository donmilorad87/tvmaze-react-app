// db.ts
import Dexie, { type EntityTable } from 'dexie';


const db = new Dexie('TVMaze') as Dexie & {
    episodes: EntityTable<
        { episodes: IEpisode[], date: string, country: string }
    >;
    shows: EntityTable<
        { episodes: PaginationShow[], page: number }
    >;

};

// Schema declaration:
db.version(1).stores({
    episodes: '++id, episodes, date, country',
    shows: '++id, episodes, page',
});


export { db };