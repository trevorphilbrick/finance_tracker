import { SidebarContent } from "./sidebar";
import { CircleX } from "lucide-react";
import { Expense } from "@/types/expense";

function SidebarCell({
  item,
  onDelete,
}: {
  item: Expense;
  onDelete: ({ id, categoryId }: { id: number; categoryId: number }) => void;
}) {
  return (
    <SidebarContent className="group">
      <div className="flex justify-between mr-2">
        <p className="ml-6 mb-2 text-slate-500">{item.description}</p>
        <CircleX
          size={16}
          onClick={() =>
            onDelete({ id: item.id, categoryId: item.category_id })
          }
          className="group-hover:visible invisible"
        />
      </div>
    </SidebarContent>
  );
}

export default SidebarCell;
