import { create } from "zustand";

type State = {
  selectedCategory: { name: string | null; id: number | null };
};

type Action = {
  setSelectedCategory: (category: State["selectedCategory"]) => void;
  clearSelectedCategory: () => void;
};

export const useAppState = create<State & Action>((set) => ({
  selectedCategory: {
    name: null,
    id: null,
  },
  setSelectedCategory: (category) =>
    set(() => ({ selectedCategory: category })),
  clearSelectedCategory: () =>
    set({
      selectedCategory: {
        name: null,
        id: null,
      },
    }),
}));
