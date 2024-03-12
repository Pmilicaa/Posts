import { Post } from "../models/Post";
import { API_URLS } from "../constants";
import { DataService } from "./DataService";
import { usePostStore } from "../store/posts-store";
import { Comment } from "../models/Comment";

interface Index {
  previous: number;
  next: number;
  nPages: number;
}
export class PostService {
  dataService: DataService = new DataService();

  async getPosts(): Promise<Post[] | null> {
    try {
      const responseData = await this.dataService.get<Post[]>(API_URLS.Posts);
      console.log("Fetched posts data:", responseData);
      return responseData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }

  async getFilteredPostsByUserId(userId: string): Promise<Post[] | null> {
    try {
      const responseData = await this.dataService.get<Post[]>(
        `${API_URLS.Posts}?userId=${userId}`
      );
      return responseData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }

  async getPostFromStore(postId: number): Promise<Post | undefined> {
    const posts = usePostStore.getState().posts;
    if (posts.length) {
      return posts.find((post: Post) => post.id == postId);
    } else {
      const post = await this.getPost(postId);
      if (post) {
        return post;
      }
    }
  }

  async getPost(postId: number): Promise<Post | null> {
    try {
      const url = `${API_URLS.Posts}/${postId}`;
      const responseData = await this.dataService.get<Post>(url);
      return responseData;
    } catch (error) {
      return null;
    }
  }

  async getCommentsByPost(postId: string): Promise<Comment[] | null> {
    try {
      const url = `${API_URLS.Posts}/${postId}/${API_URLS.Comments}`;
      const responseData = await this.dataService.get<Comment[]>(url);
      console.log("Fetched posts data:", responseData);
      return responseData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }

  getPrevAndNextIndex(postId: number): Index | undefined {
    const posts = usePostStore.getState().posts;
    if (posts.length) {
      const prevIndex = postId > 0 ? postId - 1 : 1;
      const nextIndex = postId < posts.length - 1 ? postId + 1 : posts.length;
      return { previous: prevIndex, next: nextIndex, nPages: posts.length };
    }
  }
}
export const postServiceInstance = new PostService();
