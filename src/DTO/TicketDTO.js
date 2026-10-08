export class TicketDTO {
    constructor(raw) {
        this.id = raw.id
        this.iri = raw['@id']
        this.title = raw.title
        this.description = raw.description
        this.status = raw.status
        this.priority = raw.priority
        this.createdAt = new Date(raw.createdAt)
    }

    get formattedDate() {
        return new Intl.DateTimeFormat('fr-FR').format(this.createdAt)
    }
}
