import { Post } from "../models/Post";
import { API_URLS } from "../constants";
import { DataService } from "./DataService";

export class PostService {
  dataService: DataService = new DataService();

  async getPosts(): Promise<Post[] | unknown> {
    const dataService = new DataService();
    try {
      const responseData = await dataService.get<Post[]>(API_URLS.Posts);
      console.log("Fetched posts data:", responseData);
      return responseData;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
}
export const postServiceInstance = new PostService();
