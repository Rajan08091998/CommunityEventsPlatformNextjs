export type EventProps = {
    event: {
        id: number
        title: string
        description: string
        location: string
        start_time: string
        end_time: string
        organizer: string
        participants: string[]
    }
}

export interface Event {
    id: number
    title: string
    location: string
    start_time: string
    end_time: string
    organizer: string
    description: string
    participants: string[]


}
