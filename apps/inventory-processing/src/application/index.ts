import { CreateShipmentHandler } from "./create-shipment/create-shipment.handler";
import { ShipmentProcessedEventHandler } from "./shipment-processed/shipment-processed.event.handler";

export const CommandHandlers = [
  CreateShipmentHandler,
  ShipmentProcessedEventHandler,
];
