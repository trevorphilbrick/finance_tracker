import { SidebarContent } from "./sidebar";
import { CircleX } from "lucide-react";
import { Expense } from "@/types/expense";
import { useAppState } from "@/zustand/appState";
function SidebarCell({
  item,
  onDelete,
}: {
  item: Expense;
  onDelete: ({ id, categoryId }: { id: number; categoryId: number }) => void;
}) {
  const setSelectedExpense = useAppState((state) => state.setSelectedExpense);

  return (
    <SidebarContent
      className={`group/sidebar-cell`}
      onClick={() => setSelectedExpense({ id: item.id })}
    >
      <div className="flex justify-between mr-2">
        <p className="ml-6 mb-2 text-slate-500">{item.description}</p>
        <CircleX
          size={16}
          onClick={() =>
            onDelete({ id: item.id, categoryId: item.category_id })
          }
          className={`opacity-0 group-hover/sidebar-cell:opacity-100 transition-opacity`}
        />
      </div>
    </SidebarContent>
  );
}

export default SidebarCell;
