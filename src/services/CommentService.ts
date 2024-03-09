import { Comment } from "../models/Comment";
import { API_URLS } from "../constants";
import { DataService } from "./DataService";

export class CommentService {
  dataService: DataService = new DataService();

  async getComments(): Promise<Comment[] | unknown> {
    const dataService = new DataService();
    try {
      const responseData = await dataService.get<Comment[]>(API_URLS.Comments);
      console.log("Fetched comment data:", responseData);
      return responseData;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
}
export const commentServiceInstance = new CommentService();
