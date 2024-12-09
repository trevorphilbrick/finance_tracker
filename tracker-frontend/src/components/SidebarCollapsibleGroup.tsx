import { CollapsibleContent } from "@radix-ui/react-collapsible";
import { SidebarContent, SidebarGroupContent } from "./ui/sidebar";
import { fetchExpenses } from "@/utils/fetch-Expenses";
import { useQuery } from "@tanstack/react-query";
import { Expense } from "@/types/expense";
import { Button } from "./ui/button";
import { CircleX, Plus } from "lucide-react";
import { SheetTrigger } from "./ui/sheet";
import type { Category } from "@/types/category";

function SidebarCollapsibleGroup({
  item,
  setSelectedCategory,
}: {
  item: {
    id: number;
    name: string;
  };
  setSelectedCategory: (category: Category) => void;
}) {
  const { data } = useQuery({
    queryKey: [`expenses-${item.id}`],
    queryFn: () => fetchExpenses(item.id),
  });
  return (
    <CollapsibleContent>
      <SidebarGroupContent>
        {data &&
          data.map((item: Expense) => (
            <SidebarContent>
              <div className="flex justify-between mr-2">
                <p className="ml-6 mb-2 text-slate-500">{item.description}</p>
                <CircleX size={16} />
              </div>
            </SidebarContent>
          ))}
        <SheetTrigger className="w-full">
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => setSelectedCategory(item)}
          >
            <Plus /> Add Expense
          </Button>
        </SheetTrigger>
      </SidebarGroupContent>
    </CollapsibleContent>
  );
}

export default SidebarCollapsibleGroup;
