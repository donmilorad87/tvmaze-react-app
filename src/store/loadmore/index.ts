import { makeAutoObservable } from "mobx"

class LoadMoreStore {

    data: PaginationShow[] = []
    scrollHeight: number = 0
    constructor() {
        makeAutoObservable(this)
    }

    setData(data: PaginationShow[]) {
        this.data = this.data.concat(data)
    }
    setScrollHeight(height: number) {
        this.scrollHeight = height
    }
}

const loadMoreStore: LoadMoreStore = new LoadMoreStore()
export default loadMoreStore