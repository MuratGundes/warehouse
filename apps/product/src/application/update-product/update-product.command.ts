export class UpdateProductCommand {
  constructor(
    public readonly productId: string,
    public readonly unit: number,
    public readonly isHazardous: boolean,
  ) {}
}
