import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAppState } from "@/zustand/appState";
import { z } from "zod";

const formSchema = z.object({
  category: z.string(),
  description: z.string().min(2),
  amount: z.number(),
});

function AddExpenseSheet() {
  const category = useAppState((state) => state.selectedCategory);
  return (
    <SheetContent side="bottom">
      <SheetHeader>
        <SheetTitle>Add Expense</SheetTitle>
        <SheetDescription>
          Create an expense to add to {category}
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
}

export default AddExpenseSheet;
