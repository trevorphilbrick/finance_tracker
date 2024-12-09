import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAppState } from "@/zustand/appState";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addExpense } from "@/utils/add-expense";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  description: z.string().min(2),
  amount: z.string(),
});

function AddExpenseSheet() {
  const category = useAppState((state) => state.selectedCategory);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      if (category.id) {
        await addExpense(
          category.id,
          parseInt(values.amount),
          values.description
        );

        form.reset();
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [`expenses-${category.id}`],
      });
      queryClient.setQueryData([`expenses-${category.id}`], data);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      amount: "0.00",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  return (
    <SheetContent side="bottom">
      <SheetHeader>
        <SheetTitle>Add Expense</SheetTitle>
        <SheetDescription>
          Create an expense to add to {category.name}
        </SheetDescription>
      </SheetHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Groceries" {...field} />
                </FormControl>
                <FormDescription>
                  A name or description of the expense being added.
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormDescription>Format should be "100.00"</FormDescription>
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </SheetContent>
  );
}

export default AddExpenseSheet;
