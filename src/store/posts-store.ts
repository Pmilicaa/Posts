import { create } from "zustand";
import { Post } from "../models/Post";

type PostsStore = {
  posts: Post[];
  availablePosts: Post[];
  firstPagePosts: Post[];
  toDisplay: Post[];
  setPosts: (posts: Post[]) => void;
  setAvailablePosts: (availablePosts: Post[]) => void;
  setFirstPagePosts: (firstPagePosts: Post[]) => void;
  setToDisplay: (toDisplay: Post[]) => void;
};

export const usePostStore = create<PostsStore>()((set) => ({
  posts: [],
  availablePosts: [],
  firstPagePosts: [],
  toDisplay: [],
  setPosts: (posts: Post[]) => set(() => ({ posts, availablePosts: posts })),
  setAvailablePosts: (availablePosts: Post[]) =>
    set(() => ({ availablePosts })),
  setFirstPagePosts: (firstPagePosts: Post[]) =>
    set(() => ({ firstPagePosts })),
  setToDisplay: (toDisplay: Post[]) => set(() => ({ toDisplay })),
}));
