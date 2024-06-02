import { ProductCreatedEventHandler } from './product-created.event.handler';
import { ProductUpdatedEventHandler } from './product-updated.event.handler';
import { WarehouseCreatedEventHandler } from "./warehouse-created.event.handler";

export const EventHandlers = [
  ProductCreatedEventHandler,
  ProductUpdatedEventHandler,
  WarehouseCreatedEventHandler
];
