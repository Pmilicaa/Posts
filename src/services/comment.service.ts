import { Comment } from "../models/Comment";
import { APIUrl } from "./DataAPI";
import { DataService } from "./data.service";

export class CommentService {
  dataService: DataService = new DataService();

  async getComments(): Promise<Comment[] | unknown> {
    const dataService = new DataService();
    try {
      const responseData = await dataService.get<Comment[]>(APIUrl.Comments);
      console.log("Fetched comment data:", responseData);
      return responseData;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
}
export const commentServiceInstance = new CommentService();
