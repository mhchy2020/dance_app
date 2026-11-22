import { Router } from "express";
import { eventController } from "./controller.ts";
import authorizeAdmin from "../../middleware/authorizeAdmin.ts";

export const eventRouter = Router();

eventRouter.post('/', authorizeAdmin, eventController.newEvent);
eventRouter.get('/', eventController.getEvents);
eventRouter.get('/:eventId', eventController.getEventById);
eventRouter.delete('/:eventId', authorizeAdmin, eventController.deleteEvent)
eventRouter.patch('/:eventId', authorizeAdmin, eventController.updateEvent)
// eventRouter.patch('/:eventId', eventController.updateEvent)