import { create } from "zustand";
import { Post } from "../models/Post";

type PostsStore = {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
};

export const usePostStore = create<PostsStore>()((set) => ({
  posts: [],
  setPosts: (posts: Post[]) => set(() => ({ posts: posts })),
}));
