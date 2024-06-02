import { ShipmentType } from '../../domain/shipment/shipment-type.enum';

export class CreateShipmentCommand {
  constructor(
    public readonly warehouseId: string,
    public readonly productId: string,
    public readonly shipmentType: ShipmentType,
    public readonly shipmentDate: Date,
    public readonly size: number,
  ) {}
}
