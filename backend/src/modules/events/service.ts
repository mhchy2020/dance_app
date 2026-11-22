import { eventRepository } from "./repository.ts";

export type eventDetails = {
    title: string,
          startDate: string,
          startTime: string,
          location: string,
    description: string,
    is_highlight?:boolean
          Images?: string[],
}

export const eventService = {
    createEvent: async (eventDetails:eventDetails) => { 
        const result = await eventRepository.createEvent(eventDetails);
        return result;
    }
}