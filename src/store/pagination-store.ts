import { create } from "zustand";

type PaginationStore = {
  currentPage: number;
  setCurrentPage: (pageNumber: number) => void;
};

export const usePaginationStore = create<PaginationStore>()((set) => ({
  currentPage: 1,
  setCurrentPage: (currentPage: number) => set(() => ({ currentPage })),
}));
