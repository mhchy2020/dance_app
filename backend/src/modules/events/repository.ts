import { db } from "../../config/supabase.ts";
import type { eventDetails } from "./service.ts";

export const eventRepository = {
  createEvent: async ({
    title,
    startDate,
    startTime,
    location,
    description,
    Images,
    is_highlight,
  }: eventDetails) => {

    console.log(is_highlight);

    let query: string = `INSERT into events 
                    (title, event_date, start_time, location, description, images)
                   values ($1,$2,$3,$4,$5,$6)`;
    let values = [
      title,
      startDate,
      startTime,
      location,
      description,
      Images,
    ...(is_highlight ? [is_highlight]:[])
    ]

    if (is_highlight) { 
      query = `INSERT into events 
                    (title, event_date, start_time, location, description, images, is_highlight)
                     values ($1,$2,$3,$4,$5,$6,$7)`;
    }

    const result = await db.query(query, values);
    return { message: "Event created successfully" };
  },
  getEventById: async (eventId: string) => { 
    const query = `SELECT 
    title, event_date, start_time, location, description 
    FROM events 
    WHERE id=$1`;
    const result = await db.query(query, [eventId]);
    // console.log(result);
    return {event: result.rows[0]}
  },
  updateEvent: async (fieldsToUpdate: Object, eventId: string) => { 

    console.log(Object.entries(fieldsToUpdate));

    const keys = Object.keys(fieldsToUpdate).join(", ");
    console.log(keys);
   

    const setClause = Object.entries(fieldsToUpdate).map(([key], index) => (
      `${key}=$${index+1}`)).join(", ");
    console.log(setClause);

    const values = Object.entries(fieldsToUpdate).map(([_, value]) => value);
    console.log(values);

    const query = `UPDATE events SET ${setClause} WHERE id=$${values.length+1} RETURNING ${keys}`


    const result = await db.query(query, [...values, eventId]);
    console.log(result.rows[0]);
    return result.rows[0];

  },
  deleteEvent: async (eventId: string) => { 
    const query = `DELETE FROM events WHERE id=$1`
    const result = await db.query(query, [eventId]);
    return {message: "Event successfully deleted"}
  },
};
