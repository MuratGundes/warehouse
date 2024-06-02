export class CreateProductCommand {
  constructor(
    public readonly productId: string,
    public readonly productName: string,
    public readonly productSize: number,
    public readonly isHazardous: boolean,
  ) {}
}
