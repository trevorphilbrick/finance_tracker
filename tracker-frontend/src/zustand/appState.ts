import { create } from "zustand";

type State = {
  selectedCategory: string | null;
};

type Action = {
  setSelectedCategory: (category: State["selectedCategory"]) => void;
  clearSelectedCategory: () => void;
};

export const useAppState = create<State & Action>((set) => ({
  selectedCategory: null,
  setSelectedCategory: (category) =>
    set(() => ({ selectedCategory: category })),
  clearSelectedCategory: () => set({ selectedCategory: null }),
}));
