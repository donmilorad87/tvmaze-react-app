import { makeAutoObservable } from "mobx"


class GlobalStore {

    loading: boolean = false



    constructor() {
        makeAutoObservable(this)
    }

    setLoading = (loading: boolean) => {
        this.loading = loading




    }
}

const globalStore: GlobalStore = new GlobalStore()
export default globalStore