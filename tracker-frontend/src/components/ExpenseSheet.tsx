import { fetchExpense } from "@/utils/fetch-expense";
import { useAppState } from "@/zustand/appState";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

function ExpenseSheet() {
  const selectedExpense = useAppState((state) => state.selectedExpense);

  const { data, isLoading, error } = useQuery({
    queryKey: ["expense", selectedExpense.id],
    queryFn: () => {
      if (selectedExpense.id) {
        return fetchExpense(selectedExpense.id);
      }
    },
  });

  function formatToDollarAmount(amount: number): string {
    return `$${amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  useEffect(() => {
    if (selectedExpense.id) {
      console.log(selectedExpense.id);
    }
  }, [selectedExpense]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="ml-4 mt-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">{data.description}</h1>
        <p className="text-lg">{formatToDollarAmount(data.amount)}</p>
      </div>
    </div>
  );
}

export default ExpenseSheet;
