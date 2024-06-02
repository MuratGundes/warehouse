import { ShipmentType } from 'libs/application/shipment-type.enum';

export class CreateShipmentCommand {
  constructor(
    public readonly warehouseId: string,
    public readonly productId: string,
    public readonly shipmentType: ShipmentType,
    public readonly shipmentDate: Date,
    public readonly size: number,
  ) {}
}
