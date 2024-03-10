import { User } from "../models/User";
import { API_URLS } from "../constants";
import { DataService } from "./DataService";

export class UserService {
  dataService: DataService = new DataService();

  async getUsers(): Promise<User[] | null> {
    const dataService = new DataService();
    try {
      const responseData = await dataService.get<User[]>(API_URLS.Users);
      console.log("Fetched users data:", responseData);
      return responseData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }
}
export const userServiceInstance = new UserService();
