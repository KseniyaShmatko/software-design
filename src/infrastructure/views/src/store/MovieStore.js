import {makeAutoObservable} from "mobx";

export default class MovieStore {
    constructor() {
        this._types = [{
            id: 1, name:'comedy',
            id: 2, name:'drama',
        }]
        this._brands = [{
            id: 1, name:'pixar',
            id: 2, name:'hollywood',
        }]
        this._movies = [{
            id: 1, name:'summer', release:'2024',
            id: 2, name:'winter', release:'2024',
        }]
        this._selectedType = {}
        this._selectedBrand = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 3
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }
    setBrands(brands) {
        this._brands = brands
    }
    setMovies(movies) {
        this._movies = movies
    }

    setSelectedType(type) {
        this.setPage(1)
        this._selectedType = type
    }
    setSelectedBrand(brand) {
        this.setPage(1)
        this._selectedBrand = brand
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get movies() {
        return this._movies
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}