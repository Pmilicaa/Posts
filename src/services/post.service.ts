import { Post } from "../models/Post";
import { APIUrl } from "./DataAPI";
import { DataService } from "./data.service";

export class PostService {
  dataService: DataService = new DataService();

  async getPosts(): Promise<Post[] | unknown> {
    const dataService = new DataService();
    try {
      const responseData = await dataService.get<Post[]>(APIUrl.Posts);
      console.log("Fetched posts data:", responseData);
      return responseData;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
}
export const postServiceInstance = new PostService();
