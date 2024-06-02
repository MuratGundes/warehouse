export class CreateCustomerCommand {
  constructor(
    public readonly customerId: string,
    public readonly name: string,
    public readonly surname: string,
    public readonly companyName: string,
    public readonly email: string,
  ) {}
}
