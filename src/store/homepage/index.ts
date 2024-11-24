import { formatDateToYYYYMMDD } from "@utility/date";
import { makeAutoObservable } from "mobx"


class HomepageStore {
    dates: Date = new Date();

    date: string = formatDateToYYYYMMDD(new Date(localStorage.getItem('date') ?? new Date(this.dates.setDate(this.dates.getDate() + 1))))
    country: string = localStorage.getItem('country') || 'US'

    data: IEpisode[] = []

    constructor() {
        makeAutoObservable(this)
    }


    setDate(date: string) {
        this.date = date
        localStorage.setItem('date', date)
    }

    setCountry(country: string) {
        this.country = country
        localStorage.setItem('country', country)
    }
    setData(data: IEpisode[]) {
        this.data = data
    }
}

const homepageStore: HomepageStore = new HomepageStore()
export default homepageStore