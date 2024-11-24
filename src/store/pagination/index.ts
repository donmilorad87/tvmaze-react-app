import { makeAutoObservable } from "mobx"

class PaginationStore {


    page: number = localStorage.getItem('page') ? parseInt(localStorage.getItem('page') ?? '1') : 1

    data: PaginationShow[] = []

    constructor() {
        makeAutoObservable(this)
    }


    setPage(page: number) {
        this.page = page
        localStorage.setItem('page', page.toString())
    }
}

const paginationStore: PaginationStore = new PaginationStore()
export default paginationStore