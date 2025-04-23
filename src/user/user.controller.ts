import { injectable } from "inversify";

@injectable()
export class UserController {
  constructor() {}

  public getUser() {
    // Simulate fetching user details
    return {
        firstName: "John",
        lastName: "Doe",
        email: "jon@doe.com",
    };
  }
}