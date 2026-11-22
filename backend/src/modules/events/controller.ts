import type { Request, Response } from "express";
import { eventService } from "./service.ts";
import { ApiError } from "../../utils/ApiError.ts";
import { db } from "../../config/supabase.ts";
import { eventRepository } from "./repository.ts";

export const eventController = {
  newEvent: async (req: Request, res: Response) => {
    const eventDetails = req.body;
    try {
      const result = await eventService.createEvent(eventDetails);
      return res.status(201).json({
        data: result,
        success: true,
      });
    } catch (err) {
      // console.log(err);
      if (err instanceof Error) {
        console.log("[ERROR]", err.message);
      }
      throw new ApiError(500, "Error creating event");
    }
  },
  
  getEvents: async (
    req: Request<{}, {}, {}, { is_highlight?: string }>,
    res: Response,
  ) => {
    const { is_highlight }= req.query
    const values: boolean[] = [];
    let query = `SELECT title, TO_CHAR(event_date, 'DD-MM-YYYY') AS event_date, start_time, location, description FROM events`;

    if (is_highlight!==undefined) {
      query += ` WHERE is_highlight=$1`;
      values.push(is_highlight==='true');
    }

    try {
      const result = await db.query(query, values);
      console.log(result.rows);
      return res.status(200).json({
        data: result.rows,
        success: true,
      });
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
      throw new ApiError(
        400,
        "Unable to get event details. Please try again later",
      );
    }
  },

  getEventById: async (req: Request<{ eventId: string }>, res: Response) => {
    const { eventId } = req.params;
    // console.log(eventId);
    try {
      const result = await eventRepository.getEventById(eventId);
      return res.status(200).json({
        data: result,
        success: true,
      });
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
      throw new ApiError(400, "Unable to get event details. Try again later");
    }
  },
  updateEvent: async (req: Request<{eventId: string}>, res: Response) => { 
    const fieldsToUpdate = req.body;
    const { eventId } = req.params;
    const result = await eventRepository.updateEvent(fieldsToUpdate, eventId);
    return res.status(200).json({
      data: result,
      message: "Event updated successfully",
      success: true
    })
  },
    
  deleteEvent: async (req: Request<{ eventId: string }>, res: Response) => {
    const { eventId } = req.params;
    // console.log(eventId);
    try {
      const result = await eventRepository.deleteEvent(eventId);
      return res.status(200).json({
        data: result,
        success: true,
      });
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
      throw new ApiError(400, "Unable to get event details. Try again later");
    }
  },
};
