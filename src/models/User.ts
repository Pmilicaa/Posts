interface Address {
  city: string;
  zipcode: string;
  street: string;
}

export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public address: Address,
    public phone: string,
    public website: string
  ) {}
}
