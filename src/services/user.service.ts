import { User } from "../models/User";
import { APIUrl } from "./DataAPI";
import { DataService } from "./data.service";

export class UserService {
  dataService: DataService = new DataService();

  async getUsers(): Promise<User[] | unknown> {
    const dataService = new DataService();
    try {
      const responseData = await dataService.get<User[]>(APIUrl.Users);
      console.log("Fetched users data:", responseData);
      return responseData;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
}
export const userServiceInstance = new UserService();
