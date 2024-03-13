import { create } from "zustand";
import { Post } from "../models/Post";

type PostsStore = {
  posts: Post[];
  availablePosts: Post[];
  currentPagePosts: Post[];
  postsToDisplay: Post[];
  setPosts: (posts: Post[]) => void;
  setAvailablePosts: (availablePosts: Post[]) => void;
  setCurrentPagePosts: (currentPagePosts: Post[]) => void;
  setPostsToDisplay: (postsToDisplay: Post[]) => void;
};

export const usePostStore = create<PostsStore>()((set) => ({
  posts: [],
  availablePosts: [],
  currentPagePosts: [],
  postsToDisplay: [],
  setPosts: (posts: Post[]) => set(() => ({ posts, availablePosts: posts })),
  setAvailablePosts: (availablePosts: Post[]) =>
    set(() => ({ availablePosts })),
  setCurrentPagePosts: (currentPagePosts: Post[]) =>
    set(() => ({ currentPagePosts })),
  setPostsToDisplay: (postsToDisplay: Post[]) =>
    set(() => ({ postsToDisplay })),
}));
