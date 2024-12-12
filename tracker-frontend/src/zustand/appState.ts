import { create } from "zustand";

type State = {
  selectedCategory: { name: string | null; id: number | null };
  selectedExpense: { id: number | null };
};

type Action = {
  setSelectedCategory: (category: State["selectedCategory"]) => void;
  clearSelectedCategory: () => void;
  setSelectedExpense: (expense: State["selectedExpense"]) => void;
  clearSelectedExpense: () => void;
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
  selectedExpense: {
    id: null,
  },
  setSelectedExpense: (expense) => set(() => ({ selectedExpense: expense })),
  clearSelectedExpense: () =>
    set({
      selectedExpense: {
        id: null,
      },
    }),
}));
