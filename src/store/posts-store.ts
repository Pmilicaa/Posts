import { create } from "zustand";
import { Post } from "../models/Post";

type PostsStore = {
  posts: Post[];
  currentPagedPosts: Post[];
  filteredPosts: Post[];
  setPostsByUserId: (userId: string) => void;
  setPosts: (posts: Post[]) => void;
  setCurrentPagedPosts: (currentVisiblePosts: Post[]) => void;
  setFilteredPosts: (filteredPosts: Post[]) => void;
};

export const usePostStore = create<PostsStore>()((set) => ({
  posts: [],
  currentPagedPosts: [],
  filteredPosts: [],
  setPostsByUserId: (userId: string) =>
    set((state) => {
      const filtered = state.currentPagedPosts.filter(
        (post) => post.userId == userId
      );
      return { filteredPosts: filtered };
    }),
  setFilteredPosts: (filteredPosts: Post[]) => set(() => ({ filteredPosts })),
  setPosts: (posts: Post[]) => set(() => ({ posts })),
  setCurrentPagedPosts: (currentPagedPosts: Post[]) =>
    set(() => ({ currentPagedPosts, filteredPosts: currentPagedPosts })),
}));
