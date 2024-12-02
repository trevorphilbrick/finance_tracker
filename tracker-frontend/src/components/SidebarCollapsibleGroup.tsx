import { CollapsibleContent } from "@radix-ui/react-collapsible";
import { SidebarContent, SidebarGroupContent } from "./ui/sidebar";
import { fetchExpenses } from "@/utils/fetch-Expenses";
import { useQuery } from "@tanstack/react-query";
import { Expense } from "@/types/expense";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { SheetTrigger } from "./ui/sheet";

function SidebarCollapsibleGroup({
  item,
  setSelectedCategory,
}: {
  item: {
    id: number;
    name: string;
  };
  setSelectedCategory: (name: string) => void;
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
              <p className="ml-6 mb-2 text-slate-500">{item.description}</p>
            </SidebarContent>
          ))}
        <SheetTrigger className="w-full">
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => setSelectedCategory(item.name)}
          >
            <Plus /> Add Expense
          </Button>
        </SheetTrigger>
      </SidebarGroupContent>
    </CollapsibleContent>
  );
}

export default SidebarCollapsibleGroup;
