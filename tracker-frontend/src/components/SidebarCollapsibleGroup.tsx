import { CollapsibleContent } from "@radix-ui/react-collapsible";
import { SidebarGroupContent } from "./ui/sidebar";
import { fetchExpenses } from "@/utils/fetch-Expenses";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Expense } from "@/types/expense";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { SheetTrigger } from "./ui/sheet";
import type { Category } from "@/types/category";
import SidebarCell from "./ui/SidebarCell";
import { deleteExpense } from "@/utils/delete-expense";

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
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: [`expenses-${item.id}`],
    queryFn: () => fetchExpenses(item.id),
  });

  const mutation = useMutation({
    mutationFn: async (values: { id: number; categoryId: number }) => {
      const response = await deleteExpense(values.id);
      return { ...response, ...values };
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: [`expenses-${data.categoryId}`],
      });
    },
  });

  return (
    <CollapsibleContent>
      <SidebarGroupContent>
        {data &&
          data.map((item: Expense) => {
            return <SidebarCell item={item} onDelete={mutation.mutate} />;
          })}
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
