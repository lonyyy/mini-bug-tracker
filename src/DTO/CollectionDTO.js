export class CollectionDTO {
    constructor(raw, itemMapper) {
        this.total = raw.totalItems || 0
        this.items = (raw.member || []).map((item) => itemMapper(item))
        const view = raw.view || {}
        this.nextPage = view.next || null
        this.previousPage = view.previous || null
    }

    get hasNextPage() {
        return Boolean(this.nextPage)
    }

    get hasPreviousPage() {
        return Boolean(this.previousPage)
    }
}
